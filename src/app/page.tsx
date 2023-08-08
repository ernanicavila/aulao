'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import characterService from '@/services/characterService';

type Err = {
	response: {
		data: {
			error: string;
		};
	};
};

type Characters = {
	id: number;
	name: string;
	status: string;
};
export default function Home() {
	const [filtro, setFiltro] = useState<string>('');
	const [select, setSelect] = useState<string>('');

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['Personagens'],
		queryFn: () => characterService.getAll(filtro, select),
		select: ({ data }) => data,
		retry: false,
		refetchOnWindowFocus: false,
	});

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		refetch();
	};

	return (
		<>
			<h1>Aula</h1>
			<form action="">
				<input
					type="text"
					value={filtro}
					onChange={({ target: { value } }) => setFiltro(value)}
				/>
				<select
					value={select}
					placeholder="Escolha"
					onChange={({ target: { value } }) => setSelect(value)}
				>
					<option defaultValue="">
						Select
					</option>
					<option value="alive">Vivo</option>
					<option value="dead">Morto</option>
					<option value="unknown">Desconhecido</option>
				</select>
				<button type="button" onClick={handleClick}>
					Enviar
				</button>
			</form>
			<br />
			{error ? (
				<>
					<p style={{ color: 'red' }}>
						{(error as Err)?.response?.data?.error}
					</p>
				</>
			) : (
				<>
					{isLoading ? (
						'Carregando...'
					) : (
						<>
							Total characters: {data.info.count}
							{data?.results.map((el: Characters) => (
								<div
									style={{
										display: 'flex',
										width: '300px',
										justifyContent: 'space-between',
										border: '1px solid black',
										margin: '8px',
										padding: '8px',
										color: 'white',
									}}
									key={el.id}
								>
									<p>{el.name}</p>
									<p>{el.status}</p>
								</div>
							))}
						</>
					)}
				</>
			)}
		</>
	);
}
