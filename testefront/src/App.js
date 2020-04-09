import React, { useState, useEffect } from 'react';
import './style/base.css'

function App() {
    const [repositories, setRepositories] = useState({
      formIsValid: false,
      showMessage: false
    });


    

    useEffect(() => {

      async function loadRepositories() {
        const response = await fetch(`http://localhost:8000/?a=${repositories.aeroportos}&n=${repositories.nuvens}&t=${repositories.area}`);
        const data = await response.json();
  
        setRepositories({ ret: data });
      }

      if(repositories.nuvens || repositories.area || repositories.aeroportos) {
        loadRepositories();
      }
    }, [repositories.nuvens, repositories.area, repositories.aeroportos]);


    function validation(aeroportos, nuvens, area){
      area = area.toLowerCase().split('x');
      
      if (!aeroportos || !nuvens || !area ||
      (area || area.length === 0 || parseInt(area[0].trim()) < 10 || parseInt(area[1].trim()) < 10) ||
          aeroportos < 3 || nuvens < 4) {
            setRepositories({...repositories, formIsValid: false, showMessage: true});
            return false;
      } 
       return true;
    }
    

    function enviar(event) {
      event.preventDefault();
      const data = new FormData(event.target);

      const aeroportos = data.get('aeroportos');
      const nuvens = data.get('nuvens');
      const area = data.get('area');

      const isValid = validation(aeroportos, nuvens, area);

      if(isValid) {
        setRepositories({...repositories,
          aeroportos,
          nuvens,
          area,
          showMessage: false,
          formIsValid: true
        });
      }
    }

  return (
      <>
    <div className="monitor">
    {repositories.ret && <div>
      <div className="mapas">
          {repositories.ret.mapas.map((mapa, index) => 
            <div className="mapa">
              <span className="titulo-dia">Dia {index +1}</span>
              {mapa.map(linha =>
              <div className="linha">{linha.map(celula =>
                <span className="celula">{celula}</span>
                )}</div>
              )}
            </div>
          )}
        </div>
        <p>{repositories.ret.diasParaPrimeiroAeroporto} dia(s) para o primeiro aeroporto ser coberto pelas nuvens</p>
        <p>{repositories.ret.dias} dia(s) para todos aeroportos serem cobertos pelas nuvens</p>
      </div>}
                
    </div>

    <div className="form">
      <form onSubmit={enviar}>
        <p><input type="number" name="aeroportos" placeholder="Aeroportos" id="aeroportos" /></p>
        <p><input type="number" name="nuvens" placeholder="Nuvens" id="nuvens" /></p>
        <p><input type="text" name="area" placeholder="Área (ex: 10x10)" id="area" /></p>
        <button>Enviar</button>

      </form>
    </div>
    {(!repositories.formIsValid && repositories.showMessage) && <div class="displayErrors">Formulário inválido. Os valores mínimos são:
    
        <br />
          Aeroportos: 3;
       <br />
          Nuvens: 4;
        <br />
          Área: 10x10;
     
    </div>}
    </>

  );
}

export default App;
