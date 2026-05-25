from django.db import models

class Artifact(models.Model) :
    id = models.AutoField(primary_key=True)
    artifactName = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    header = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
