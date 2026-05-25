from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
import pycountry


class account(BaseUserManager):
    def userAcc(self, name, email, country, password=None):
        user = self.model(
            Name=name,
            Email=self.normalize_email(email),
            Country=country,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

class abAccount(AbstractBaseUser):
    @staticmethod
    def get_country():
        countries = list(pycountry.countries)
        country_choices = [(country.alpha_2,country.name) for country in countries]
        return country_choices
