ALTER procedure [dbo].[SEL_COTIZACION_PARTIDAS_SP] (
	@idUsuario numeric(18,0),
	@idProveedorCotizacion numeric(18,0)
)
as
begin

	SELECT
		par.idPartida,
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
		ISNULL(ppa.costo,0.00) as costo,
		pes.idPartidaEstatus,
		isnull(pes.estatus, 'Sin Asignar') as partidaEstatus
	FROM
		dbo.Partida par
		LEFT JOIN ProveedorPartida ppa ON ppa.idPartida = par.idPartida
		LEFT JOIN dbo.Unidad uni ON uni.idUnidad = par.idUnidad
		LEFT JOIN dbo.Especialidad esp ON esp.idEspecialidad = par.idEspecialidad
		LEFT JOIN PartidaClasificacion cl1 ON cl1.idPartidaClasificacion = par.idPartidaClasificacion
		LEFT JOIN PartidaSubClasificacion cl2 ON cl2.idPartidaSubClasificacion = par.idPartidaSubClasificacion
		LEFT JOIN PartidaEstatus pes ON pes.idPartidaEstatus = ppa.idPartidaEstatus
	WHERE 
		par.estatus = 1
		and (ppa.idProveedorCotizacion = @idProveedorCotizacion OR ppa.idProveedorCotizacion IS NULL)

end
