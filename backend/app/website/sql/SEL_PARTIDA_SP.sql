ALTER procedure dbo.SEL_PARTIDA_SP (
	@idUsuario numeric(18,0),
	@idUnidad numeric(18,0)
)
as
begin

	SELECT
		idPartida,
		--unidad
		par.idUnidad,
		tip.idTipoUnidad,
		tip.tipo as tipoUnidad,
		uni.anio,
		uni.version,
		sma.nombre as subMarca,
		sma.idSubMarca,
		mar.nombre as marca,
		
		---------
		esp.idEspecialidad,
		esp.especialidad,
		cl1.idPartidaClasificacion,
		cl1.clasificacion,
		cl2.idPartidaSubClasificacion,
		cl2.subClasificacion,
		partida,
		noParte,
		par.descripcion,
		par.foto,
		par.instructivo,
		par.estatus
	FROM
		dbo.Partida par
		LEFT JOIN dbo.Unidad uni ON uni.idUnidad = par.idUnidad
		LEFT JOIN dbo.Especialidad esp ON esp.idEspecialidad = par.idEspecialidad
		LEFT JOIN TipoUnidad tip ON tip.idTipoUnidad = uni.idTipoUnidad
		LEFT JOIN SubMarca sma ON sma.idSubmarca = uni.idSubMarca
		LEFT JOIN Marca mar ON mar.idMarca = sma.idMarca
		LEFT JOIN PartidaClasificacion cl1 ON cl1.idPartidaClasificacion = par.idPartidaClasificacion
		LEFT JOIN PartidaSubClasificacion cl2 ON cl2.idPartidaSubClasificacion = par.idPartidaSubClasificacion
	WHERE 
		par.estatus = 1
		AND uni.idUnidad = @idUnidad

end

