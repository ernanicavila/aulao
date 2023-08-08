'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import characterService from '@/services/characterService';

type Err = {
	response?: {
		data?: {
			message?: string;
		};
	};
};
export default function Home() {
	const [filtro, setFiltro] = React.useState('');
	const [select, setSelect] = React.useState('');

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['Personagens'],
		queryFn: () => characterService.getAll(filtro, select),
		select: ({ data }) => data,
		retry: false,
	});
	const handleClick = (e) => {
		e.preventDefault();
		refetch();
	};

	console.log(error);

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
					name=""
					id=""
					value={select}
					placeholder="Escolha"
					onChange={({ target: { value } }) => setSelect(value)}
				>
					<option value="" disabled selected>
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
			{error && error?.response?.data?.error}
			{isLoading ? (
				'Carregando...'
			) : (
				<>
					{/* Total characters: {data.info.count} */}
					{data?.results.map((el) => (
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
	);
}
