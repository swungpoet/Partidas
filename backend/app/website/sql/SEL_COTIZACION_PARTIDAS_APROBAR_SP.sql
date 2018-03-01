ALTER procedure [dbo].[SEL_COTIZACION_PARTIDAS_APROBAR_SP] (
	@idUsuario numeric(18,0),
	@idProveedorCotizacion numeric(18,0)
)
as
begin

	DECLARE @SQL as NVARCHAR(max)
	SET @SQL = ''
	SET @SQL += 'SELECT
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
		ISNULL(ppa.costo,0.00) as costo, '
		
	DECLARE @idProveedor AS numeric(18,0)
	--Obtengo los proveedores
	DECLARE _cursor CURSOR FOR 
	SELECT
		pro.idProveedor
	FROM
		dbo.ProveedorCotizacion pco
		LEFT JOIN dbo.Proveedor pro ON pro.idProveedor = pco.idProveedor
	WHERE 
		pco.idUnidad in(
		SELECT idUnidad FROM dbo.ProveedorCotizacion pcox 
		WHERE pcox.idProveedorCotizacion = @idProveedorCotizacion 
	)
	AND pco.idProveedor NOT IN (SELECT pcoy.idProveedor 
								FROM  dbo.ProveedorCotizacion pcoy 
								WHERE pcoy.idProveedorCotizacion = @idProveedorCotizacion  )
	OPEN _cursor 
	FETCH NEXT FROM _cursor INTO @idProveedor
	WHILE @@FETCH_STATUS = 0 
	BEGIN
		
		SET @SQL +=' (SELECT ISNULL(ppaw.costo,0.00) FROM  dbo.ProveedorCotizacion pcow 
				LEFT JOIN dbo.ProveedorPartida ppaw ON ppaw.idProveedorCotizacion = pcow.idProveedorCotizacion  
				WHERE (ppaw.idPartida = par.idPartida OR ppaw.idPartida is null) and pcow.idProveedor = ' + CAST(@idProveedor AS NVARCHAR(10)) + ' ) as C' + CAST(@idProveedor AS NVARCHAR(10)) + ' ,'
	
	FETCH NEXT FROM _cursor INTO @idProveedor
	END 
	CLOSE _cursor 
	DEALLOCATE _cursor
	
	SET @SQL += ' (SELECT MIN(ISNULL(ppaw.costo,0.00)) FROM  dbo.ProveedorCotizacion pcow 
					LEFT JOIN dbo.ProveedorPartida ppaw ON ppaw.idProveedorCotizacion = pcow.idProveedorCotizacion  
					WHERE (ppaw.idPartida = par.idPartida OR ppaw.idPartida is null)  
					AND ISNULL(ppaw.costo,0.00) > 0 ) as minimo , '
		
	SET @SQL += ' (SELECT MAX(ISNULL(ppaw.costo,0.00)) FROM  dbo.ProveedorCotizacion pcow 
					LEFT JOIN dbo.ProveedorPartida ppaw ON ppaw.idProveedorCotizacion = pcow.idProveedorCotizacion  
					WHERE (ppaw.idPartida = par.idPartida OR ppaw.idPartida is null)  
					AND ISNULL(ppaw.costo,0.00) > 0 ) as maximo , '

	SET @SQL += ' (SELECT (SUM(ISNULL(ppaw.costo,0.00)) / 
		 				( SELECT COUNT(1)
					  FROM  dbo.ProveedorCotizacion pcow 
					LEFT JOIN dbo.ProveedorPartida ppaw ON ppaw.idProveedorCotizacion = pcow.idProveedorCotizacion  
					WHERE (ppaw.idPartida = par.idPartida OR ppaw.idPartida is null) 
					AND ISNULL(ppaw.costo,0.00) > 0 ))
					 FROM  dbo.ProveedorCotizacion pcow 
					LEFT JOIN dbo.ProveedorPartida ppaw ON ppaw.idProveedorCotizacion = pcow.idProveedorCotizacion  
					WHERE (ppaw.idPartida = par.idPartida OR ppaw.idPartida is null) 
					AND ISNULL(ppaw.costo,0.00) > 0 ) as promedio, '
		
	SET @SQL +=' par.idPartida,
			pes.idPartidaEstatus,
			pes.estatus as partidaEstatus
		FROM
		dbo.Partida par
		LEFT JOIN dbo.Unidad uni ON uni.idUnidad = par.idUnidad
		LEFT JOIN dbo.Especialidad esp ON esp.idEspecialidad = par.idEspecialidad
		LEFT JOIN PartidaClasificacion cl1 ON cl1.idPartidaClasificacion = par.idPartidaClasificacion
		LEFT JOIN PartidaSubClasificacion cl2 ON cl2.idPartidaSubClasificacion = par.idPartidaSubClasificacion
		LEFT JOIN ProveedorPartida ppa ON ppa.idProveedorCotizacion = ' +  CAST(@idProveedorCotizacion AS NVARCHAR(10))  +
	'	LEFT JOIN PartidaEstatus pes ON pes.idPartidaEstatus = ppa.idPartidaEstatus
	 WHERE 
		par.estatus = 1 '
		
	EXEC sp_executesql @SQL,  N'@idProveedorCotizacion INT', @idProveedorCotizacion 

	

end
