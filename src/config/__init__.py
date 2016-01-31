import os
import pathlib

PORT = 8080
ROOT_PATH = pathlib.Path((os.path.dirname(__file__))) / '../../'
SRC_PATH = ROOT_PATH / 'src'
BUILD_PATH = ROOT_PATH / 'build'
