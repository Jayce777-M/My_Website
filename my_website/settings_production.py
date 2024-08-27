# settings_production.py

from .settings import *

DEBUG = False
ALLOWED_HOSTS = ['https://lit-escarpment-08397-4873313e1f66.herokuapp.com/', ' https://git.heroku.com/lit-escarpment-08397.git']

# Security settings
SECRET_KEY = 'django-insecure-8#j5jx23k(9my12(8$5oyca=v$1o)#!dmw%(^+_#1!iel-0&_9'
SECURE_SSL_REDIRECT = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
