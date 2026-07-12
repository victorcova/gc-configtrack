# ConfigTrack

Projeto acadêmico desenvolvido para aplicar, de forma prática, os processos de Gerência de Configuração.

## Objetivo

Demonstrar o controle do ciclo de vida de um projeto por meio de versionamento, ramificação, integração, criação de baseline, gerenciamento de releases e construção automatizada.

## Funcionalidade planejada

O sistema permitirá informar uma versão de software e verificar se ela está de acordo com o padrão de versionamento semântico.

Exemplos de versões válidas:

- `v1.0.0`
- `v2.3.1`
- `v10.4.2`

## Tecnologias

- HTML
- CSS
- JavaScript
- Node.js
- Git
- GitHub
- GitHub Actions

## Estado atual

Versão estável: `1.0.0`.

## Validação semântica

A aplicação valida versões no formato `vMAJOR.MINOR.PATCH`.

A suíte automatizada pode ser executada com:

```bash
npm test
```

## Integração contínua

O workflow `.github/workflows/ci.yml` executa automaticamente:

1. obtenção do código-fonte;
2. configuração da versão controlada do Node.js;
3. instalação reproduzível com `npm ci`;
4. execução dos testes automatizados;
5. construção da pasta `dist`;
6. validação da integridade dos arquivos;
7. publicação do artefato do build.

O workflow é acionado em pushes e Pull Requests destinados à branch `main`.
