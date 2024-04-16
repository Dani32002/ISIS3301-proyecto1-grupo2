from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.metrics import classification_report
import pandas as pd
import re, unicodedata
import inflect
import contractions
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.base import BaseEstimator, ClassifierMixin, TransformerMixin
from sklearn.model_selection import GridSearchCV
from sklearn.linear_model import LogisticRegression
import nltk
import joblib
from nltk import word_tokenize
nltk.download('stopwords')
from nltk.corpus import stopwords
import spacy
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split

class TextPreprocessor(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.stop_words_spanish = set(stopwords.words('spanish'))
        self.lemmatizer = spacy.load("es_core_news_sm")

    def remove_non_ascii(self, words):
        return [unicodedata.normalize('NFKD', word).encode('ascii', 'ignore').decode('utf-8', 'ignore') if word is not None else None for word in words]

    def to_lowercase(self, words):
        return [word.lower() for word in words]

    def remove_punctuation(self, words):
        return [re.sub(r'[^\w\s]', '', word) if word is not None else None for word in words]

    def replace_numbers(self, words):
        p = inflect.engine()
        return [p.number_to_words(word) if word.isdigit() else word for word in words if not any(char.isdigit() for char in word)]

    def remove_stopwords(self, words):
        return [word for word in words if word not in self.stop_words_spanish]

    def remove_accidentals(self, words):
        replacements = {'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u'}
        return [''.join(replacements[char] if char in replacements else char for char in word) for word in words]

    def lemmatize_verbs(self, words):
        doc = self.lemmatizer(" ".join(words))
        return [token.lemma_ for token in doc]

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X['Review'] = X['Review'].apply(contractions.fix)
        X['words'] = X['Review'].apply(word_tokenize)
        X['words'].dropna(inplace=True)
        X['words'] = X['words'].apply(self.to_lowercase)
        X['words'] = X['words'].apply(self.replace_numbers)
        X['words'] = X['words'].apply(self.remove_punctuation)
        X['words'] = X['words'].apply(self.remove_non_ascii)
        X['words'] = X['words'].apply(self.remove_stopwords)
        X['words'] = X['words'].apply(self.lemmatize_verbs)
        X['words'] = X['words'].apply(self.remove_accidentals)
        X['words'] = X['words'].apply(lambda x: ' '.join(map(str, x)))
        X['words'] = X['words'].apply(lambda x: re.sub(r'\s+', ' ', x))
        X['words'] = X['words'].apply(lambda x: x.strip())
        return X
    

class Vectorizer(BaseEstimator, TransformerMixin):
    def __init__(self):
        pass

    def fit(self, X, y=None):
        tf_idf = TfidfVectorizer()
        X_tf_idf = tf_idf.fit_transform(X['words'])
        data_prep = X_tf_idf.copy().todense()
        data_prep = pd.DataFrame(data_prep, columns=tf_idf.vocabulary_.keys())
        self.columns=data_prep.columns
        return self

    def transform(self, X, y=None):
        tf_idf = TfidfVectorizer()
        X_tf_idf = tf_idf.fit_transform(X['words'])
        data_new = pd.DataFrame(X_tf_idf.toarray(), columns=tf_idf.get_feature_names_out())
        data_new = data_new.reindex(columns=self.columns)
        data_new.fillna(0, inplace=True)

        # Get the features present in the training data but not in the test data
        missing_features = set(self.columns) - set(data_new.columns)

        # Get the features present in the test data but not in the training data
        extra_features = set(data_new.columns) - set(self.columns)
        for feature in missing_features:
          data_new[feature] = 0
        # Drop the extra features from the test data
        data_new.drop(columns=extra_features, inplace=True)
        data_new = data_new.apply(lambda x: (x - x.min()) / (x.max() - x.min()), axis=1)
        return data_new

# Custom estimator for GridSearchCV
class GridSearchCVWrapper(BaseEstimator, ClassifierMixin):
    def __init__(self, base_model, param_grid, cv=5):
        self.base_model = base_model
        self.param_grid = param_grid
        self.cv = cv
        self.grid_search = GridSearchCV(self.base_model, self.param_grid, cv=self.cv)

    def fit(self, X, y=None):
        self.grid_search.fit(X, y)
        self.best_estimator_ = self.grid_search.best_estimator_
        return self

    def predict(self, X):
        return self.best_estimator_.predict(X)
    
    def predict_proba(self, X):
        return self.best_estimator_.predict_proba(X)
    
    def best_estimator_(self):
        return self.best_estimator_
  
param_grid = {
    'penalty': ['l2'],
    'C': [3],
    'solver': ['sag'],
    'max_iter': [1000]
}

data=pd.read_csv('./assets/tipo1_entrenamiento_estudiantes.csv', sep=',', encoding = 'utf-8')
label = 'Class'
features = data.columns.to_list()
features.remove(label)

x_train, x_test, y_train, y_test = train_test_split(data[features], data[label], test_size=0.2, random_state=1)
#json_array = data.head(2000).to_json(orient='records')
#with open("./assets/datos.txt", "w") as text_file:
#    text_file.write(json_array)


"""# Define the pipeline with preprocessing and logistic regression model
pipeline = Pipeline([
    ('preprocessor', TextPreprocessor()),
    ('vectorizer', Vectorizer()),
    ('LogisticRegression', GridSearchCVWrapper(LogisticRegression(), param_grid, cv=2))
])

# Fit the pipeline and predict
pipa = pipeline.fit(x_train, y_train)
y_pred = pipa.predict(x_test)
print(classification_report(y_test, y_pred))
joblib.dump(pipeline, './assets/pipelineReviews.joblib')"""