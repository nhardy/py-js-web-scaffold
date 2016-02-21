import json
import shlex
import tornado.gen
from concurrent.futures import ProcessPoolExecutor
from Naked.toolshed.shell import muterun_js

from src.config import BUILD_PATH


class NodeException(Exception):
  def __init__(self, message, stderr, stdout):
    _message = '{}\nNode STDERR:\n{}\nNode STDOUT:\n{}'.format(message, stderr, stdout)
    super().__init__(_message)

    self.stderr = stderr
    self.stdout = stdout

class ServerResponse:
  def __init__(self):
    self._stderr = None
    self._stdout = None
    self._message = None

  @property
  def stderr(self):
    return self._stderr

  @stderr.setter
  def stderr(self, value):
    self._stderr = value.decode('utf-8')

  @property
  def stdout(self):
    return self._stdout

  @stdout.setter
  def stdout(self, value):
    self._stdout = value.decode('utf-8')
    try:
      self._message = json.loads(self._stdout.split('\n')[-2])
    except json.decoder.JSONDecodeError:
      raise NodeException('An exception occurred whilst parsing the output from Node. See debug info below.', self.stderr, self.stdout)

  @property
  def body(self):
    return self._message['body']

  @property
  def status(self):
    return self._message['status']

  @property
  def error(self):
    return self._message['error']

@tornado.gen.coroutine
def request(path):
  server_bundle = str(BUILD_PATH / 'server.js')
  safe_path = shlex.quote(path)

  pool = ProcessPoolExecutor(max_workers=1)

  res = yield pool.submit(muterun_js, server_bundle, '--path={}'.format(safe_path))

  if res.exitcode != 0:
    raise NodeException('An exception occurred within the Node application. See debug info below.', res.stderr.decode('utf-8'), res.stdout.decode('utf-8'))

  server_response = ServerResponse()
  server_response.stderr = res.stderr
  server_response.stdout = res.stdout

  pool.shutdown()

  return server_response
