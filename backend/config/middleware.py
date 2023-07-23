


from utils.jwt_util import JWTUtil


class SpeakUpMiddleware():
    def __init__(self, get_response):
        self.get_response = get_response


    def __call__(self, request):
        print("you are in middleware. HAPPY")
        response = self.get_response(request)
        payload = JWTUtil.get_jwt_payload(request)
        print(payload)
        print("valid token::", JWTUtil.verify_jwt(request))
        

        return response