
from django.http import HttpResponse, JsonResponse
from django.template import RequestContext

def ping(request, id):
    #health check用
    print(request.resolver_match.kwargs)
    # for key in request.__dict__.keys():
    #     print("/////////////////////////", key)
    #     print(request.__dict__[key])
    # print(request.__dict__["META"].keys())
    return HttpResponse("Hello World!!")

