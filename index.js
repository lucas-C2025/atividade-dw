const token =  `7bf15bbb3d3c1d`;
const button = document.querySelector('.btnPesquisar');
const ipEnviado = document.getElementById('ipEnviado'); // todo elemento recebido pelo getElement é um dado html
                                                        // não é o dado em si, é preciso um .value
                                                        // para acessar o valor, linha 12 o dado está corrigido
const adicionaNoFim = document.getElementById('resultado')

adicionaNoFim.innerHTML = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">IP</th>
        <th scope="col">Hostname</th>
        <th scope="col">País</th>
        <th scope="col">Região</th>
        <th scope="col">Excluir</th>
      </tr>
    </thead>
    <tbody id="tabelaCorpo"></tbody>
  </table>
`;


async function pegaDadosIP(x) { 
    const url = `https://ipinfo.io/${x}/json?token=${token}`;
    const resultado = await fetch(url);
    return await resultado.json();
}
button.addEventListener('click', async function () {
  const ip = ipEnviado.value;
  const dadosIP = await pegaDadosIP(ip);

  const corpoTabela = document.getElementById('tabelaCorpo');
  const novaLinha = document.createElement('tr');

  novaLinha.innerHTML = `
    <th scope="row">${corpoTabela.children.length + 1}</th>
    <td>${dadosIP.ip}</td>
    <td>${dadosIP.hostname || '-'}</td>
    <td>${dadosIP.country || '-'}</td>
    <td>${dadosIP.region || '-'}</td>
    <td><button class="btnExcluir btn btn-danger btn-sm">X</button></td>
  `;

  // Adiciona evento de clique no botão "Excluir" da nova linha
  novaLinha.querySelector('.btnExcluir').addEventListener('click', () => {
    novaLinha.remove();
    atualizaNumeracao();
  });

  corpoTabela.appendChild(novaLinha);
});
