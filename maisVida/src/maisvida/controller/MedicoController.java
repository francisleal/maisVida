package maisvida.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import maisvida.dao.DaoImplementacao;
import maisvida.dao.DaoInterface;
import maisvida.model.Medico;

@Controller
@RequestMapping(value="medico")
public class MedicoController extends DaoImplementacao<Medico> implements DaoInterface<Medico> {
	
	public MedicoController(Class<Medico> persistenceClass) {
		super(persistenceClass);
	}
	
	//salvar 
	@RequestMapping(value="salvar", method=RequestMethod.POST)
	@ResponseBody
	public ResponseEntity salvar(@RequestBody String jsonMedico) throws Exception {
		Medico medico = new Gson().fromJson(jsonMedico, Medico.class);
		super.salvarOuAtualizar(medico);
		return new ResponseEntity(HttpStatus.CREATED);
	}
	
	//listar
	@RequestMapping(value="listar", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public byte[] listar() throws Exception {		
		return new Gson().toJson(super.lista()).getBytes("UTF-8");
	}
	
	//buscar visualiza médico por id
	@RequestMapping(value="buscarmedico/{codMedico}", method=RequestMethod.GET)
	public @ResponseBody byte[] buscarMedico(@PathVariable("codMedico") String codMedico) throws Exception {
		Medico objeto = super.loadObjeto(Long.parseLong(codMedico));
		if (objeto  == null) {
			return "{}".getBytes("UTF-8");
		}
		return new Gson().toJson(objeto).getBytes("UTF-8");
	}
	
	//deletar médico por id
	@RequestMapping(value="deletar/{codMedico}", method=RequestMethod.DELETE)
	public @ResponseBody String deletar(@PathVariable("codMedico") String codMedico) throws Exception {
		Medico objeto = new Medico();		
		objeto.setId(Long.parseLong(codMedico));
		super.deletar(objeto);
		return "";
	}
	
}
















