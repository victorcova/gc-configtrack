const SEMANTIC_VERSION_PATTERN =
    /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

/**
 * Remove espaços externos e garante que o valor analisado seja textual.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function normalizeVersion(value) {
    return typeof value === 'string'
        ? value.trim()
        : '';
}

/**
 * Verifica se o valor segue o padrão vMAJOR.MINOR.PATCH.
 *
 * Não são aceitos zeros à esquerda, exceto quando o próprio
 * componente da versão é igual a zero.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function isValidSemanticVersion(value) {
    const normalizedValue = normalizeVersion(value);

    return SEMANTIC_VERSION_PATTERN.test(normalizedValue);
}

/**
 * Produz o resultado apresentado pela interface.
 *
 * @param {unknown} value
 * @returns {{
 *   valid: boolean,
 *   type: 'empty' | 'success' | 'error',
 *   message: string
 * }}
 */
export function validateVersion(value) {
    const normalizedValue = normalizeVersion(value);

    if (!normalizedValue) {
        return {
            valid: false,
            type: 'empty',
            message: 'Informe uma versão antes de realizar a validação.'
        };
    }

    if (isValidSemanticVersion(normalizedValue)) {
        return {
            valid: true,
            type: 'success',
            message: `A versão ${normalizedValue} segue o padrão adotado.`
        };
    }

    return {
        valid: false,
        type: 'error',
        message:
            'Versão inválida. Utilize o formato vMAJOR.MINOR.PATCH, como v1.0.0.'
    };
}

/**
 * Inicializa o comportamento do formulário quando executado no navegador.
 *
 * @returns {void}
 */
function initializeVersionForm() {
    const form = document.querySelector('#version-form');
    const input = document.querySelector('#version-input');
    const resultElement = document.querySelector('#validation-result');

    if (!form || !input || !resultElement) {
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const result = validateVersion(input.value);

        resultElement.textContent = result.message;
        resultElement.className = 'result';

        if (result.type === 'success') {
            resultElement.classList.add('result--success');
            input.setAttribute('aria-invalid', 'false');
            return;
        }

        resultElement.classList.add('result--error');
        input.setAttribute('aria-invalid', 'true');
    });
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            initializeVersionForm
        );
    } else {
        initializeVersionForm();
    }
}
