import tornado.web
import tornado.gen

from src.js import NodeException, request


class MainHandler(tornado.web.RequestHandler):
  async def get(self, path):
    try:
      response = await request(path)
    except NodeException:
      try:
        response = await request('/__server_error')
      except NodeException:
        raise tornado.web.HTTPError(500)

    if response.status == 200:
      self.write(response.body)
    elif response.status >= 400:
      self.set_status(response.status)
      self.write(response.body)
