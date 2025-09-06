import {HttpErrorResponse} from '@angular/common/http';

export function handleHttpError(err: HttpErrorResponse) {
    if (err.status === 403) {
        alert('Acesso negado: você não tem permissão.');
    } else if (err.status === 404) {
        alert(err.error?.message ?? 'Registro não encontrado.');
    } else if (err.status === 409) {
        alert( err.error?.message ?? 'Não é possível excluir: existem registros associados.');
    } else {
        alert(`Ocorreu um erro: ${err.message || 'desconhecido'}`);
    }
}