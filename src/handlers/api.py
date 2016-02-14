import tornado.web

from src.api.pages import page_controller


class APIHandler(tornado.web.RequestHandler):
  def get(self, path):
    try:

      if path == '/':
        self.write({
          'message': 'This is the default API Index response.'
        })
        return

      if path.startswith('/pages/'):
        page_controller(self, path[6:])

    except Exception as error:
      self.set_status(500)
      self.write({
        'message': 'An unknown server error ocurred.'
      })
      print(error)

