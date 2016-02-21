import tornado.web
import tornado.httpserver
import tornado.ioloop

from src.config import BUILD_PATH, PORT, SRC_PATH
from src.handlers import APIHandler, MainHandler, StaticFileHandler


def application():
  return tornado.web.Application(
    [
      (r'/(favicon\.ico)', StaticFileHandler, {'path': str(SRC_PATH / 'static')}),
      (r'/(.*\.(?:css|js))', StaticFileHandler, {'path': str(BUILD_PATH / 'dist')}),
      (r'/api/v1(/.*)', APIHandler),
      (r'(/.*)', MainHandler)
    ],
    debug=True,
  )

def run():
  http_server = tornado.httpserver.HTTPServer(application())
  http_server.listen(PORT)
  print('Server is starting...')
  tornado.ioloop.IOLoop.instance().start()
