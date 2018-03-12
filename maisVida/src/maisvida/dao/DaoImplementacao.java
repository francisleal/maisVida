package maisvida.dao;

import java.util.List;

import org.hibernate.SessionFactory;

import maisvida.hibernate.HibernateUtil;

public abstract class DaoImplementacao<T> implements DaoInterface<T> {
	
	private Class<T> persistenceClass;
	
	private SessionFactory sf = HibernateUtil.getSessionFactory();
	
	public DaoImplementacao(Class<T> persistenceClass) {
		super();
		this.persistenceClass = persistenceClass;
	}
	
	// salvar
	@Override
	public void salvar(T objeto) throws  Exception {
		sf.getCurrentSession().save(objeto);
		sf.getCurrentSession().flush();
	}
	
	// deletar
	@Override
	public void deletar(T objeto) throws  Exception {
		sf.getCurrentSession().delete(objeto);
		sf.getCurrentSession().flush();
	}
	
	// atualizar
	@Override
	public void atualizar(T objeto) throws  Exception {
		sf.getCurrentSession().update(objeto);
		sf.getCurrentSession().flush();
	}
	
	// salvar ou Atualizar
	@Override
	public void salvarOuAtualizar(T objeto) throws  Exception {
		sf.getCurrentSession().saveOrUpdate(objeto);
		sf.getCurrentSession().flush();
	}
	
//	@SuppressWarnings("unchecked")
//	@Override
//	public T merge(T objeto) throws Exception {
//		T t = (T) sf.getCurrentSession().merge(objeto);
//		sf.getCurrentSession().flush();
//		return t;
//	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<T> lista() throws Exception {
		return sf.getCurrentSession().createCriteria(persistenceClass).list();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public T loadObjeto(Long codigo) throws Exception {
		return (T) sf.getCurrentSession().get(persistenceClass, codigo);
	}
	
	// get set
	public Class<T> getPersistenceClass() {
		return persistenceClass;
	}

	public SessionFactory getSf() {
		return sf;
	}

}
