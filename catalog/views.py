from django.shortcuts import render
from django.http import JsonResponse
from .models import Artifact

def artifact_api(request):
    artifacts_list = []
    for art in Artifact.objects.all():
        # image is a CharField containing e.g. 'assets/images/...'
        image_url = request.build_absolute_uri('/' + art.image) if art.image else None

        artifacts_list.append(
            {
                "id": art.id,
                "artifactName": art.artifactName,
                "category": art.category,
                "header": art.header,
                "image": image_url,
            }
        )

    return JsonResponse({"artifacts": artifacts_list})
