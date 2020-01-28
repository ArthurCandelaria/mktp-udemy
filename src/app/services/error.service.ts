import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class ErrorService {

  constructor() { }

  formatErrorResponse(_error) {
    const defaultMsg = 'Ocorreu um erro ao tentar atualizar as informações' + ' - status: ' + _error.status;
    switch (typeof _error) {
      case 'string':
        return _error;
      case 'object':
        try {
          if (_error.status === 404) {
            return 'Nenhuma informação encontrada para essa consulta - status: ' + _error.status;
          }
          if (_error._body) {
            if (_error._body.charAt(0) === '{') {
              const errorBody = JSON.parse(_error._body);
              if (errorBody.message) {
                return errorBody.message + ' - status: ' + _error.status;
              }
              if (errorBody.errors) {
                if (errorBody.errors.url) {
                  const errorMsg = errorBody.errors.message;
                  const codeErrorsWords = ['java.', 'Exception', 'I/O', 'ORA-', 'apache'];
                  const hasCodeError = codeErrorsWords.some(e => errorMsg.includes(e));
                  setTimeout(() => {
                    $('.alert .fa').removeClass('fa-warning').addClass('fa-exclamation-circle');
                    $('.error-msg').click(() => { $('.error-origin').removeClass('hide') });
                  }, 1000);
                  return `
                    <p class='no-margin'><span class='error-msg'>${hasCodeError ? defaultMsg : errorMsg}</span><i class='error-icon fa fa-code'></i></p>
                    <small class="error-origin hide"><hr class='mt-10 mb-15'>
                      ${errorMsg}&nbsp;|&nbsp;
                      ${errorBody.errors.url.replace('https://', '').replace('http://', '')}
                    </small>`;
                }
                if (errorBody.errors.message) {
                  if (typeof errorBody.errors.message == 'object') {
                    return JSON.stringify(errorBody.errors.message);
                  }
                  else {
                    return errorBody.errors.message + ' - status: ' + _error.status;
                  }
                }
              }
            }
            else {
              return _error._body + ' - status: ' + _error.status;
            }
          }
          if (_error.errors && _error.errors.message) {
            return _error.errors.message + ' - status: ' + _error.status;
          }
          if (_error.message) {
            return _error.message + ' - status: ' + _error.status;
          }
        }
        catch (err) {
          return 'Ocorreu um erro ao tentar realizar essa consulta - status: ' + err;
        }
        break;
      default:
        return defaultMsg;
    }
  }

}
