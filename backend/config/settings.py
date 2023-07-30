
# import django
# django.setup()
from pathlib import Path
import os
from datetime import timedelta
import config
# Build paths inside the project like this: BASE_DIR / 'subdir'.
import environ

env = environ.Env()
env.read_env('.env')

JWT_SECRET = env('JWT_SECRET')


#BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) #DIFFERENCE
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '^w(3at+g%$ni6eyz%e!j!^$db+2a=m#sf+a58bm+lyiaf_j+1!'

# SECURITY WARNING: don't run with debug turned on in production!
#True
DEBUG = True
#if you define the host speakup-heroku.herokuapp.com, it allows only https
ALLOWED_HOSTS = [
    'speakup-heroku.herokuapp.com',
    '127.0.0.1',
    'localhost'
    ]

# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'channels',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'rest_framework',
    'rest_framework.authtoken', #added
    'chats',
    'accounts',
    'swipes',
    'django_filters',
    #'django_file_download',
    # 'easy_thumbnails',  => crop
    # 'image_cropping',
]

# from easy_thumbnails.conf import Settings as thumbnail_settings
# THUMBNAIL_PROCESSORS = (
#     'image_cropping.thumbnail_processors.crop_corners',  => crop
# ) + thumbnail_settings.THUMBNAIL_PROCESSORS


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # "config.middleware.SpeakUpMiddleware"
]

ROOT_URLCONF = 'config.urls'

#os.path.join(BASE_DIR, 'chat/templates')
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

#WSGI_APPLICATION = 'config.wsgi.application'
ASGI_APPLICATION = 'config.routing.application'#DIFFERENCE

CHANNEL_LAYERS = {#DIFFERENCE
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [os.environ.get('REDIS_URL', 'redis://localhost:6379')],
        },
    },
}



DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'speakup',
        'USER': 'postgres',
        'PASSWORD': 'root',
        'HOST': 'localhost',
        "PORT": "5432"
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/






API_VERSION = "v1"

REST_FRAMEWORK = {
    # 'DEFAULT_PERMISSION_CLASSES': (
    #     'rest_framework.permissions.IsAuthenticated',
    #     'rest_framework.permissions.IsAdminUser', 
    #     'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',  # for normal rest-frmaework,

    # ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication', #added for 401
        'rest_framework_simplejwt.authentication.JWTAuthentication', # comma is required
        # 'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}





SITE_ID = 5
#CORS_ORIGIN_ALLOW_ALL = True # added XHTMLrequest cors





CORS_ORIGIN_ALLOW_ALL = True



# CACHES = {
#     "default": {
#          "BACKEND": "redis_cache.RedisCache",
#          "LOCATION": os.environ.get('REDIS_URL'),
#     }
# }
BROKER_URL = os.environ.get("REDIS_URL")

# CELERY_RESULT_BACKEND = os.environ.get("REDIS_URL")

# CELERY_TASK_SERIALIZER = 'json'
# CELERY_RESULT_SERIALIZER = 'json'
# CELERY_ACCEPT_CONTENT = ['json']



#/static/
STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static'),
    os.path.join(BASE_DIR, 'static')
]
#static => staticfiles
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfile')


#/images/
MEDIA_URL = '/images/'

#static/images
MEDIA_ROOT = os.path.join(BASE_DIR, 'static/images')



GOOGLE_OAUTH = {
    "issuer": "https://accounts.google.com",
    "provider": "google",
    "client_id": "3391403677-hq0b1v297vme0p7jjh234a344lrol8gm.apps.googleusercontent.com"
}


