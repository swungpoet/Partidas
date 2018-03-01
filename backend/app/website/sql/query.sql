SELECT
		kit.partida,
		kit.descripcion,
		kit.instructivo,
		ISNULL(pki.costoPieza,0.00) as costoPieza,  
		ISNULL(pki.costoMano,0.00) as costoMano,  
		ISNULL(pki.costo,0.00) as costo,  
		
		 (SELECT ISNULL(pkiw.costo,0.00) FROM  dbo.ProveedorCotizacion pcow 
				LEFT JOIN dbo.ProveedorKit pkiw ON pkiw.idProveedorCotizacion = pcow.idProveedorCotizacion  
				WHERE (pkiw.idKit = kit.idKit OR pkiw.idKit is null) and pcow.idProveedor = 7 and pcow.idUnidad = uni.idUnidad ) as C7 , 
				
			 (SELECT MIN(ISNULL(pkiw.costo,0.00)) FROM  dbo.ProveedorCotizacion pcow 
				LEFT JOIN dbo.ProveedorKit pkiw ON pkiw.idProveedorCotizacion = pcow.idProveedorCotizacion   
					WHERE (pkiw.idKit = kit.idKit OR pkiw.idKit is null)
					AND pcow.idUnidad = uni.idUnidad 
					AND ISNULL(pkiw.costo,0.00) > 0 ) as minimo,

			(SELECT MAX(ISNULL(pkiw.costo,0.00)) FROM  dbo.ProveedorCotizacion pcow 
				LEFT JOIN dbo.ProveedorKit pkiw ON pkiw.idProveedorCotizacion = pcow.idProveedorCotizacion   
					WHERE (pkiw.idKit = kit.idKit OR pkiw.idKit is null)
					AND pcow.idUnidad = uni.idUnidad 
					AND ISNULL(pkiw.costo,0.00) > 0 ) as maximo,

			(SELECT (SUM(ISNULL(pkiw.costo,0.00)) /
				(SELECT COUNT(1) FROM  dbo.ProveedorCotizacion pcow 
				LEFT JOIN dbo.ProveedorKit pkiw ON pkiw.idProveedorCotizacion = pcow.idProveedorCotizacion   
					WHERE (pkiw.idKit = kit.idKit OR pkiw.idKit is null)
					AND pcow.idUnidad = uni.idUnidad 
					AND ISNULL(pkiw.costo,0.00) > 0 )
			)
			FROM  dbo.ProveedorCotizacion pcow 
				LEFT JOIN dbo.ProveedorKit pkiw ON pkiw.idProveedorCotizacion = pcow.idProveedorCotizacion   
					WHERE (pkiw.idKit = kit.idKit OR pkiw.idKit is null)
					AND pcow.idUnidad = uni.idUnidad 
					AND ISNULL(pkiw.costo,0.00) > 0 ) as promedio,
					
					
					kit.idKit,
					
			pes.idPartidaEstatus,
			pes.estatus as partidaEstatus
		FROM
		dbo.Kit kit
		LEFT JOIN dbo.Unidad uni ON uni.idUnidad = kit.idUnidad
		LEFT JOIN ProveedorCotizacion pco ON pco.idUnidad = uni.idUnidad
		LEFT JOIN ProveedorKit pki ON pki.idKit = kit.idKit AND pki.idProveedorCotizacion = pco.idProveedorCotizacion
		LEFT JOIN PartidaEstatus pes ON pes.idPartidaEstatus = pki.idPartidaEstatus
	 WHERE 
		kit.estatus = 1 
		and pco.idProveedorCotizacion = 7
		
		
		-------
		--Ejemplos
		
		


		
		

