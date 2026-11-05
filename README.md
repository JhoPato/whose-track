# Fone Alheio

Jogo musical para jogar com amigos: cada pessoa cola links de músicas do Spotify, o jogo toca uma de cada vez e todo mundo tenta adivinhar de quem é.

- Um arquivo só (`index.html`), sem servidor próprio.
- Multiplayer de navegador para navegador com [PeerJS](https://peerjs.com/). O navegador de quem cria a sala faz o papel de servidor: se ele fechar a aba, a partida acaba.
- Áudio pelo player oficial do Spotify (prévia de 30 s, ou a faixa inteira para quem está logado no Spotify no navegador).

## Pontos

- +100 por pessoa certa, −50 por pessoa errada (mínimo 0 na rodada)
- +50 se acertar exatamente quem tem a música
- Dono da música: +40 por cada pessoa que não desconfiou dele

## Rodar localmente

```bash
python -m http.server 8765
```

Depois abra http://localhost:8765.
