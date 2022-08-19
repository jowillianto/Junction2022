import os
import pathlib
from typing import Callable

class ENVParserError(Exception):
    message     = None
    def __init__(self, message : str):
        '''
            message     : error message thrown to screen
        '''
        self.message    = message
    def __repr__(self):
        return self.message

class ENVParser:
    def __init__(self):
        use_secret          = os.environ.get('PRODUCTION', 'false') == 'true'
        
        self.db_creds       = self._parse_environ('DB_', use_secret)
        self.django_secret  = self._parse_environ('DJANGO_SECRET_KEY', use_secret)
        self.ignite         = self._parse_environ('IGNITE', False)
        self.debug          = not use_secret

    def _parse_environ(self, keyword_start : str, secret : bool, wrapper : Callable = None):
        env_dict    = {}
        for key, item in os.environ.items():
            if key.startswith(keyword_start):
                if secret and key not in ["DB_PORT", "DB_HOST"] and not wrapper:
                    str_path    = pathlib.Path(item)
                    if str_path.is_file():
                        with open(str_path) as file:
                            env_dict[key]   = file.read().strip('\n') \
                                if not wrapper \
                                else wrapper(file.read().strip('\n'))
                    else:
                        err_msg     = f'For {key}, {item} does not exist'
                        raise ENVParserError(err_msg)
                else:
                    env_dict[key]   = item if not wrapper else wrapper(item)
        return env_dict

    @staticmethod
    def remove_keyhead(input_dict : dict, overhead : str):
        return_dict     = {}
        for key, value in input_dict.items():
            return_dict[key.lstrip(overhead)] = value
        return return_dict