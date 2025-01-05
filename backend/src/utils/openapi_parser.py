def parse_openapi_spec(spec):
    try:
        name = spec['info']['title']
        endpoints = {
            path: details for path , details in spec['paths'].items()
        }
        return {"name": name, "endpoints": endpoints}
    except KeyError as e:
        raise Exception(f"Invalid OpenAPI spec: {e}")   