import test from 'node:test';
import assert from 'node:assert/strict';

import {
    isValidSemanticVersion,
    normalizeVersion,
    validateVersion
} from '../assets/js/app.js';

test('normaliza espaços externos do valor informado', () => {
    assert.equal(normalizeVersion('  v1.2.3  '), 'v1.2.3');
});

test('retorna texto vazio para valores não textuais', () => {
    assert.equal(normalizeVersion(null), '');
    assert.equal(normalizeVersion(undefined), '');
    assert.equal(normalizeVersion(123), '');
});

test('aceita versões semânticas válidas', () => {
    const validVersions = [
        'v0.0.0',
        'v1.0.0',
        'v2.15.3',
        'v10.20.30',
        'v999.999.999'
    ];

    for (const version of validVersions) {
        assert.equal(
            isValidSemanticVersion(version),
            true,
            `${version} deveria ser válida`
        );
    }
});

test('aceita uma versão válida com espaços externos', () => {
    assert.equal(
        isValidSemanticVersion('  v1.2.3  '),
        true
    );
});

test('rejeita versões sem o prefixo v', () => {
    assert.equal(isValidSemanticVersion('1.0.0'), false);
});

test('rejeita versões com componentes ausentes ou excedentes', () => {
    const invalidVersions = [
        'v1',
        'v1.0',
        'v1.0.0.0'
    ];

    for (const version of invalidVersions) {
        assert.equal(
            isValidSemanticVersion(version),
            false,
            `${version} deveria ser inválida`
        );
    }
});

test('rejeita zeros à esquerda', () => {
    const invalidVersions = [
        'v01.0.0',
        'v1.00.0',
        'v1.0.01'
    ];

    for (const version of invalidVersions) {
        assert.equal(
            isValidSemanticVersion(version),
            false,
            `${version} deveria ser inválida`
        );
    }
});

test('rejeita textos e caracteres fora do padrão', () => {
    const invalidVersions = [
        'versao-final',
        'v1.0.x',
        'V1.0.0',
        'v1-0-0',
        ''
    ];

    for (const version of invalidVersions) {
        assert.equal(
            isValidSemanticVersion(version),
            false,
            `${version} deveria ser inválida`
        );
    }
});

test('produz resultado de sucesso para uma versão válida', () => {
    const result = validateVersion('v3.2.1');

    assert.equal(result.valid, true);
    assert.equal(result.type, 'success');
    assert.match(result.message, /v3\.2\.1/);
});

test('produz resultado específico para valor vazio', () => {
    const result = validateVersion('   ');

    assert.equal(result.valid, false);
    assert.equal(result.type, 'empty');
    assert.match(result.message, /Informe uma versão/);
});

test('produz resultado de erro para versão inválida', () => {
    const result = validateVersion('1.0');

    assert.equal(result.valid, false);
    assert.equal(result.type, 'error');
    assert.match(result.message, /Versão inválida/);
});
