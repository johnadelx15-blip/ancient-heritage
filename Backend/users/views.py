from django.shortcuts import render
from .models import abAccount

def register(request):
    countries = abAccount.get_country()
    return render(request, 'sign-up.html', {'countries': countries})