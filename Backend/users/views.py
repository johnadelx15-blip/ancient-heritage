from django.shortcuts import render
from .models import abAccount

def register(request):
    countries = abAccount.get_country()
    return render(request, 'signup.html', {'countries', countries})