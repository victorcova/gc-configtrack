# Histórico de Alterações

Este documento registra as mudanças relevantes das versões do ConfigTrack.

## [1.0.0] - 2026-07-12

### Adicionado

- Interface web responsiva para validação de versões.
- Regra de validação no formato vMAJOR.MINOR.PATCH.
- Tratamento de valores válidos, inválidos e vazios.
- Suíte com 11 testes automatizados.
- Script padronizado de construção.
- Validação da integridade e dos metadados do artefato.
- Workflow de integração contínua com GitHub Actions.
- Publicação automatizada do artefato de construção.

### Gerência de Configuração

- Controle de mudanças por Issues.
- Desenvolvimento isolado em branches.
- Integração por Pull Requests.
- Histórico incremental de commits.
- Versionamento controlado por arquivos e tags.
- Geração reproduzível de artefatos.

### Qualidade

- Onze testes aprovados.
- Validação de versão, commit, data e Node.js.
- Execução automatizada em push e Pull Request.
- Verificação dos arquivos obrigatórios do pacote.
