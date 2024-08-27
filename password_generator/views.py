from django.shortcuts import render
import random


def pw(request):
    return render(request, 'pw.html')

def new_pw(request):
    size = int(request.GET.get('size', 10))
    has_numbers = request.GET.get('numbers')
    has_uppercase = request.GET.get('uppercase')
    has_special_chars = request.GET.get('special')
    the_new_pw = ''

    pw_list = list('abcdefghijklmnopqrstuvwxyz')
    if has_numbers:
        pw_list.extend('1234567890')

    if has_uppercase:
        pw_list.extend('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

    if has_special_chars:
        pw_list.extend('!@#$%^&*()_?/\+')


    for i in range(size):
        the_new_pw += random.choice(pw_list)
    


    return render(request, 'new_pw.html', { 'size': size, 'the_new_pw': the_new_pw })
def index(request):
    return render(request, 'index.html')
def home(request):
    return render(request, 'home.html')
def results(request):
    userChoice = int(request.GET.get('userChoice'))

    count = 0
    items = []

    while(count < 5):
      dice1= random.randint(1 , 6)
      dice2= random.randint(1 , 6)
      roll= dice1 + dice2
      items.append(roll)
      count += 1


    return render(request, 'results.html', {'choice' : userChoice, 'items' : items})
