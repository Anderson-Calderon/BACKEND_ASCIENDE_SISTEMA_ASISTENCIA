
import Area from '../models/AreaModel.js';

 const crearArea = async (req,res)=>{


	console.log("TRATANDO DE CREAR UN ÁREA");

	const {nombre} = req.body;

	console.log(nombre);

	const existeArea =await  Area.findOne({nombre});

	

	if(existeArea){

		const error = new Error("Ya existe un área con el mismo nombre");

		return res.status(400).json({msg:error.message});

	}

	try{

		const areaNueva = new Area(req.body);
		const nuevaArea = await areaNueva.save();
		
		res.json({

			"msg":"AREA CREADA"

		});

	}catch(e){
		console.log("HELLO");
		console.log(e);

	}

}

const obtenerAreas = async (req,res)=>{


	const areas = await  Area.find();

	res.json(areas);

}

const eliminarArea = async (req,res)=>{

	const {id}=req.params;

	const area = await Area.findById(id);

	try{


		await area.deleteOne();

		res.json({

			"msg":"Área eliminada correctamente"

		});


	}catch(e){

		console.log(e);

	}

}

const editarArea = async (req,res)=>{


	const {id} = req.params;
	
	const area = await Area.findById(id),
		  areaConElMismoNombreExiste = await Area.findOne({nombre:req.body.nombreArea});



	if(!area){

		const error = new Error("El área que desea editar no existe");
		console.log("pasó algo ?");

		return res.status(400).json({msg:error.message});


	}

	if(areaConElMismoNombreExiste && area.nombre!=req.body.nombreArea){

		const error = new Error("El nombre que desea asignar a su área ya existe . Por favor intente con otro nombre!");
		

		return res.status(400).json({msg:error.message});
	}


	area.nombre = req.body.nombreArea;

	try{

		await area.save();

		res.json({"msg":"Área editada correctamente"});

	}catch(error){

		console.log(error);

	}


}

export {

			crearArea,
			obtenerAreas,
			eliminarArea,
			editarArea
		}