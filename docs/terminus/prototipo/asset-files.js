/* Versões selecionadas nos registros de produção; aprovação artística pendente. */
(function (root) {
  const files = {
    portraits: {
      "lala": {
        "concept": "../arte/bustos/expressoes/referencias/lala-concept-autor.png",
        "files": {
          "neutro": "../../../assets/terminus/bustos/expressoes/lala/neutro.png",
          "feliz": "../../../assets/terminus/bustos/expressoes/lala/feliz.png",
          "triste": "../../../assets/terminus/bustos/expressoes/lala/triste.png",
          "raiva": "../../../assets/terminus/bustos/expressoes/lala/raiva.png",
          "confuso": "../../../assets/terminus/bustos/expressoes/lala/confuso.png"
        }
      },
      "assaltante-1": {
        "concept": "../../../assets/terminus/bustos/expressoes/assaltante-1/neutro.png",
        "files": {
          "neutro": "../../../assets/terminus/bustos/expressoes/assaltante-1/neutro.png",
          "feliz": "../../../assets/terminus/bustos/expressoes/assaltante-1/feliz.png",
          "triste": "../../../assets/terminus/bustos/expressoes/assaltante-1/triste.png",
          "raiva": "../../../assets/terminus/bustos/expressoes/assaltante-1/raiva.png",
          "confuso": "../../../assets/terminus/bustos/expressoes/assaltante-1/confuso.png"
        }
      },
      "assaltante-2": {
        "concept": "../../../assets/terminus/bustos/expressoes/assaltante-2/neutro.png",
        "files": {
          "neutro": "../../../assets/terminus/bustos/expressoes/assaltante-2/neutro.png",
          "feliz": "../../../assets/terminus/bustos/expressoes/assaltante-2/feliz.png",
          "triste": "../../../assets/terminus/bustos/expressoes/assaltante-2/triste.png",
          "raiva": "../../../assets/terminus/bustos/expressoes/assaltante-2/raiva.png",
          "confuso": "../../../assets/terminus/bustos/expressoes/assaltante-2/confuso.png"
        }
      },
      "veterano": {
        "concept": "../../../assets/terminus/bustos/expressoes/veterano/neutro.png",
        "files": {
          "neutro": "../../../assets/terminus/bustos/expressoes/veterano/neutro.png",
          "feliz": "../../../assets/terminus/bustos/expressoes/veterano/feliz.png",
          "triste": "../../../assets/terminus/bustos/expressoes/veterano/triste.png",
          "raiva": "../../../assets/terminus/bustos/expressoes/veterano/raiva.png",
          "confuso": "../../../assets/terminus/bustos/expressoes/veterano/confuso.png"
        }
      },
      "iniciante": {
        "concept": "../../../assets/terminus/bustos/expressoes/iniciante/neutro.png",
        "files": {
          "neutro": "../../../assets/terminus/bustos/expressoes/iniciante/neutro.png",
          "feliz": "../../../assets/terminus/bustos/expressoes/iniciante/feliz.png",
          "triste": "../../../assets/terminus/bustos/expressoes/iniciante/triste.png",
          "raiva": "../../../assets/terminus/bustos/expressoes/iniciante/raiva.png",
          "confuso": "../../../assets/terminus/bustos/expressoes/iniciante/confuso.png"
        }
      },
      "ferido": {
        "concept": "../../../assets/terminus/bustos/expressoes/ferido/neutro.png",
        "files": {
          "neutro": "../../../assets/terminus/bustos/expressoes/ferido/neutro.png",
          "feliz": "../../../assets/terminus/bustos/expressoes/ferido/feliz.png",
          "triste": "../../../assets/terminus/bustos/expressoes/ferido/triste.png",
          "raiva": "../../../assets/terminus/bustos/expressoes/ferido/raiva.png",
          "confuso": "../../../assets/terminus/bustos/expressoes/ferido/confuso.png"
        }
      },
      "testemunha": {
        "concept": "../../../assets/terminus/bustos/expressoes/testemunha/neutro.png",
        "files": {
          "neutro": "../../../assets/terminus/bustos/expressoes/testemunha/neutro.png",
          "feliz": "../../../assets/terminus/bustos/expressoes/testemunha/feliz.png",
          "triste": "../../../assets/terminus/bustos/expressoes/testemunha/triste.png",
          "raiva": "../../../assets/terminus/bustos/expressoes/testemunha/raiva.png",
          "confuso": "../../../assets/terminus/bustos/expressoes/testemunha/confuso.png"
        }
      },
      "trabalhador-1": {
        "concept": "../../../assets/terminus/bustos/expressoes/trabalhador-1/neutro.png",
        "files": {
          "neutro": "../../../assets/terminus/bustos/expressoes/trabalhador-1/neutro.png",
          "feliz": "../../../assets/terminus/bustos/expressoes/trabalhador-1/feliz.png",
          "triste": "../../../assets/terminus/bustos/expressoes/trabalhador-1/triste.png",
          "raiva": "../../../assets/terminus/bustos/expressoes/trabalhador-1/raiva.png",
          "confuso": "../../../assets/terminus/bustos/expressoes/trabalhador-1/confuso.png"
        }
      },
      "trabalhador-2": {
        "concept": "../../../assets/terminus/bustos/expressoes/trabalhador-2/neutro.png",
        "files": {
          "neutro": "../../../assets/terminus/bustos/expressoes/trabalhador-2/neutro.png",
          "feliz": "../../../assets/terminus/bustos/expressoes/trabalhador-2/feliz.png",
          "triste": "../../../assets/terminus/bustos/expressoes/trabalhador-2/triste.png",
          "raiva": "../../../assets/terminus/bustos/expressoes/trabalhador-2/raiva.png",
          "confuso": "../../../assets/terminus/bustos/expressoes/trabalhador-2/confuso.png"
        }
      },

      ghork: {
        concept: "../../../assets/terminus/bustos/em-revisao/ghork-v2.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/ghork/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/ghork/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/ghork/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/ghork/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/ghork/confuso.png",
        },
      },
      rheed: {
        concept: "../arte/bustos/referencias/rheed-concept-autor.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/rheed-colorido-v1/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/rheed-colorido-v1/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/rheed-colorido-v1/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/rheed-colorido-v1/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/rheed-colorido-v1/confuso.png",
        },
      },
      crianca: {
        concept: "../../../assets/terminus/bustos/em-revisao/crianca-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/crianca/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/crianca/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/crianca/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/crianca/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/crianca/confuso.png",
        },
      },
      borun: {
        concept: "../../../assets/terminus/bustos/em-revisao/borun-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/borun/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/borun/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/borun/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/borun/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/borun/confuso.png",
        },
      },
      sevrak: {
        concept: "../../../assets/terminus/bustos/em-revisao/sevrak-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/sevrak/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/sevrak/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/sevrak/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/sevrak/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/sevrak/confuso.png",
        },
      },
      virmura: {
        concept: "../../../assets/terminus/bustos/em-revisao/virmura-v2.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/virmura/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/virmura/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/virmura/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/virmura/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/virmura/confuso.png",
        },
      },
      dorga: {
        concept: "../../../assets/terminus/bustos/em-revisao/dorga-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/dorga/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/dorga/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/dorga/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/dorga/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/dorga/confuso.png",
        },
      },
      torvak: {
        concept: "../../../assets/terminus/bustos/em-revisao/torvak-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/torvak/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/torvak/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/torvak/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/torvak/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/torvak/confuso.png",
        },
      },
      meruna: {
        concept: "../../../assets/terminus/bustos/em-revisao/meruna-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/meruna/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/meruna/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/meruna/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/meruna/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/meruna/confuso.png",
        },
      },
      nima: {
        concept: "../../../assets/terminus/bustos/em-revisao/nima-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/nima/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/nima/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/nima/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/nima/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/nima/confuso.png",
        },
      },
      nyra: {
        concept: "../../../assets/terminus/bustos/em-revisao/nyra-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/nyra/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/nyra/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/nyra/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/nyra/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/nyra/confuso.png",
        },
      },
      odrik: {
        concept: "../../../assets/terminus/bustos/em-revisao/odrik-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/odrik/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/odrik/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/odrik/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/odrik/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/odrik/confuso.png",
        },
      },
      "neral-disfarce": {
        concept:
          "../../../assets/terminus/bustos/em-revisao/neral-disfarce-v2.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/neral-disfarce/neutro.png",
          feliz:
            "../../../assets/terminus/bustos/expressoes/neral-disfarce/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/neral-disfarce/triste.png",
          raiva:
            "../../../assets/terminus/bustos/expressoes/neral-disfarce/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/neral-disfarce/confuso.png",
        },
      },
      "neral-revelado": {
        concept:
          "../../../assets/terminus/bustos/em-revisao/neral-revelado-v4.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/neral-revelado/neutro.png",
          feliz:
            "../../../assets/terminus/bustos/expressoes/neral-revelado/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/neral-revelado/triste.png",
          raiva:
            "../../../assets/terminus/bustos/expressoes/neral-revelado/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/neral-revelado/confuso.png",
        },
      },
      "neral-transformado": {
        concept:
          "../../../assets/terminus/bustos/em-revisao/neral-transformado-v4.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/neral-transformado/neutro.png",
          feliz:
            "../../../assets/terminus/bustos/expressoes/neral-transformado/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/neral-transformado/triste.png",
          raiva:
            "../../../assets/terminus/bustos/expressoes/neral-transformado/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/neral-transformado/confuso.png",
        },
      },
      darvek: {
        concept: "../../../assets/terminus/bustos/em-revisao/darvek-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/darvek/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/darvek/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/darvek/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/darvek/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/darvek/confuso.png",
        },
      },
      durn: {
        concept: "../../../assets/terminus/bustos/em-revisao/durn-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/durn/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/durn/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/durn/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/durn/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/durn/confuso.png",
        },
      },
      edrin: {
        concept: "../../../assets/terminus/bustos/em-revisao/edrin-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/edrin/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/edrin/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/edrin/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/edrin/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/edrin/confuso.png",
        },
      },
      elune: {
        concept: "../../../assets/terminus/bustos/em-revisao/elune-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/elune/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/elune/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/elune/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/elune/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/elune/confuso.png",
        },
      },
      guedra: {
        concept: "../../../assets/terminus/bustos/em-revisao/guedra-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/guedra/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/guedra/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/guedra/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/guedra/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/guedra/confuso.png",
        },
      },
      ivara: {
        concept: "../../../assets/terminus/bustos/em-revisao/ivara-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/ivara/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/ivara/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/ivara/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/ivara/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/ivara/confuso.png",
        },
      },
      lethra: {
        concept: "../../../assets/terminus/bustos/em-revisao/lethra-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/lethra/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/lethra/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/lethra/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/lethra/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/lethra/confuso.png",
        },
      },
      lurga: {
        concept: "../../../assets/terminus/bustos/em-revisao/lurga-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/lurga/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/lurga/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/lurga/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/lurga/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/lurga/confuso.png",
        },
      },
      ossena: {
        concept: "../../../assets/terminus/bustos/em-revisao/ossena-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/ossena/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/ossena/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/ossena/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/ossena/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/ossena/confuso.png",
        },
      },
      pirka: {
        concept: "../../../assets/terminus/bustos/em-revisao/pirka-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/pirka/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/pirka/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/pirka/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/pirka/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/pirka/confuso.png",
        },
      },
      rask: {
        concept: "../../../assets/terminus/bustos/em-revisao/rask-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/rask/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/rask/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/rask/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/rask/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/rask/confuso.png",
        },
      },
      sivren: {
        concept: "../../../assets/terminus/bustos/em-revisao/sivren-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/sivren/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/sivren/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/sivren/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/sivren/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/sivren/confuso.png",
        },
      },
      tessa: {
        concept: "../../../assets/terminus/bustos/em-revisao/tessa-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/tessa/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/tessa/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/tessa/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/tessa/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/tessa/confuso.png",
        },
      },
      zagra: {
        concept: "../../../assets/terminus/bustos/em-revisao/zagra-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/zagra/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/zagra/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/zagra/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/zagra/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/zagra/confuso.png",
        },
      },
      brakka: {
        concept: "../../../assets/terminus/bustos/em-revisao/brakka-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/brakka/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/brakka/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/brakka/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/brakka/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/brakka/confuso.png",
        },
      },
      sura: {
        concept: "../../../assets/terminus/bustos/em-revisao/sura-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/sura/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/sura/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/sura/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/sura/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/sura/confuso.png",
        },
      },
      korr: {
        concept: "../../../assets/terminus/bustos/em-revisao/korr-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/korr/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/korr/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/korr/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/korr/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/korr/confuso.png",
        },
      },
      velka: {
        concept: "../../../assets/terminus/bustos/em-revisao/velka-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/velka/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/velka/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/velka/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/velka/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/velka/confuso.png",
        },
      },
      mavren: {
        concept: "../../../assets/terminus/bustos/em-revisao/mavren-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/mavren/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/mavren/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/mavren/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/mavren/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/mavren/confuso.png",
        },
      },
      jorvi: {
        concept: "../../../assets/terminus/bustos/em-revisao/jorvi-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/jorvi/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/jorvi/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/jorvi/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/jorvi/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/jorvi/confuso.png",
        },
      },
      seldan: {
        concept: "../../../assets/terminus/bustos/em-revisao/seldan-v2.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/seldan/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/seldan/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/seldan/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/seldan/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/seldan/confuso.png",
        },
      },
      fendro: {
        concept: "../../../assets/terminus/bustos/em-revisao/fendro-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/fendro/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/fendro/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/fendro/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/fendro/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/fendro/confuso.png",
        },
      },
      zaila: {
        concept: "../../../assets/terminus/bustos/em-revisao/zaila-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/zaila/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/zaila/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/zaila/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/zaila/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/zaila/confuso.png",
        },
      },
      urdan: {
        concept: "../../../assets/terminus/bustos/em-revisao/urdan-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/urdan/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/urdan/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/urdan/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/urdan/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/urdan/confuso.png",
        },
      },
      baska: {
        concept: "../../../assets/terminus/bustos/em-revisao/baska-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/baska/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/baska/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/baska/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/baska/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/baska/confuso.png",
        },
      },
      moldren: {
        concept: "../../../assets/terminus/bustos/em-revisao/moldren-v1.png",
        files: {
          neutro:
            "../../../assets/terminus/bustos/expressoes/moldren/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/moldren/feliz.png",
          triste:
            "../../../assets/terminus/bustos/expressoes/moldren/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/moldren/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/moldren/confuso.png",
        },
      },
      nodri: {
        concept: "../../../assets/terminus/bustos/em-revisao/nodri-v1.png",
        files: {
          neutro: "../../../assets/terminus/bustos/expressoes/nodri/neutro.png",
          feliz: "../../../assets/terminus/bustos/expressoes/nodri/feliz.png",
          triste: "../../../assets/terminus/bustos/expressoes/nodri/triste.png",
          raiva: "../../../assets/terminus/bustos/expressoes/nodri/raiva.png",
          confuso:
            "../../../assets/terminus/bustos/expressoes/nodri/confuso.png",
        },
      },
    },
    objects: {
      "obj-mapa-entrada": "../../../assets/terminus/objetos/obj-mapa-entrada.png",
      "obj-mapa-retirada": "../../../assets/terminus/objetos/obj-mapa-retirada.png",
      "quest-lista-patio": "../../../assets/terminus/objetos/quest-lista-patio.png",
      "quest-etiquetas-patio": "../../../assets/terminus/objetos/quest-etiquetas-patio.png",
      "quest-registro-retirada": "../../../assets/terminus/objetos/quest-registro-retirada.png",
      "quest-apontamentos-a": "../../../assets/terminus/objetos/quest-apontamentos-a.png",
      "quest-pedido-maca": "../../../assets/terminus/objetos/quest-pedido-maca.png",
      "quest-maca": "../../../assets/terminus/objetos/quest-maca.png",
      "quest-recibo-maca": "../../../assets/terminus/objetos/quest-recibo-maca.png",
      "quest-lista-virmura": "../../../assets/terminus/objetos/quest-lista-virmura.png",
      "quest-bolsa-materiais": "../../../assets/terminus/objetos/quest-bolsa-materiais.png",
      "quest-registro-carga": "../../../assets/terminus/objetos/quest-registro-carga.png",
      "quest-apontamentos-b": "../../../assets/terminus/objetos/quest-apontamentos-b.png",
      "quest-fardo": "../../../assets/terminus/objetos/quest-fardo.png",
      "quest-recibo-fardo": "../../../assets/terminus/objetos/quest-recibo-fardo.png",
      "quest-ataduras": "../../../assets/terminus/objetos/quest-ataduras.png",
      "quest-recibo-ataduras": "../../../assets/terminus/objetos/quest-recibo-ataduras.png",
      "quest-procedimento": "../../../assets/terminus/objetos/quest-procedimento.png",
      "quest-apontamentos-c": "../../../assets/terminus/objetos/quest-apontamentos-c.png",
      "quest-estojo": "../../../assets/terminus/objetos/quest-estojo.png",
      "quest-apoios": "../../../assets/terminus/objetos/quest-apoios.png",
      "quest-carga-leve": "../../../assets/terminus/objetos/quest-carga-leve.png",
      "quest-levantamento": "../../../assets/terminus/objetos/quest-levantamento.png",
      "quest-recibo-dam": "../../../assets/terminus/objetos/quest-recibo-dam.png",
      "quest-autorizacao-r2": "../../../assets/terminus/objetos/quest-autorizacao-r2.png",
      "quest-relato-anonimo": "../../../assets/terminus/objetos/quest-relato-anonimo.png",
      "quest-peca-avariada": "../../../assets/terminus/objetos/quest-peca-avariada.png",
      "quest-nota-condicao": "../../../assets/terminus/objetos/quest-nota-condicao.png",
      "quest-autorizacao-armacao": "../../../assets/terminus/objetos/quest-autorizacao-armacao.png",
      "quest-contas-cisterna": "../../../assets/terminus/objetos/quest-contas-cisterna.png",
      "quest-deposito": "../../../assets/terminus/objetos/quest-deposito.png",
      "quest-chave-cisterna": "../../../assets/terminus/objetos/quest-chave-cisterna.png",
      "quest-programa": "../../../assets/terminus/objetos/quest-programa.png",
      "quest-correspondencia": "../../../assets/terminus/objetos/quest-correspondencia.png",
      "quest-copia-correspondencia": "../../../assets/terminus/objetos/quest-copia-correspondencia.png",
    },
    backgrounds: {
      "estalagem-salao": "estalagem-nyra-salao-v1",
      "estalagem-patio": "estalagem-nyra-patio-v2",
      mercado: "mercado-provisoes-v2",
      "virmura-sede": "guilda-virmura-recepcao-v1",
      "virmura-enfermaria": "guilda-virmura-enfermaria-v1",
      "borun-sede": "guilda-borun-v1",
      "sevrak-sede": "guilda-sevrak-v1",
      "quarta-sede": "quarta-guilda-v1",
      "coliseu-entrada": "coliseu-entrada-v2",
      "coliseu-arena": "coliseu-arena-v1",
      "coliseu-servico": "coliseu-servico-v2",
      oficina: "oficina-durn-v1",
      treino: "espaco-treino-v1",
      boticario: "boticario-v1",
      contratos: "casa-contratos-mapas-v1",
      "minas-entrada": "minas-entrada-v1",
      "minas-subsolo": "minas-galeria-v1",
      cisterna: "cisterna-obras-v1",
      coreto: "coreto-noite-historia-colorido-v1",
    },
  };
  for (const id of ["sevrak", "ghork", "brakka", "nima", "sura", "edrin", "korr", "velka", "tessa", "mavren", "odrik", "lethra"]) {
    files.portraits[id].costumes = {
      "tiny-hat": Object.fromEntries(["neutro", "feliz", "triste", "raiva", "confuso"].map(expression =>
        [expression, `../../../assets/terminus/bustos/expressoes/${id}/tiny-hat/${expression}.png`])),
    };
  }
  root.TerminusAssetFiles = files;
  if (typeof module !== "undefined") module.exports = files;
})(globalThis);
