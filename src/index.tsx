import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, SyntheticEvent } from 'react';
import clsx from 'clsx';

import { useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import { formStateType } from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// Стейт формы может включать значения null, поэтому поднятии состояния нужно избавиться от них

	function onFormSubmit(formState: formStateType) {
		const nonNullableOptions: ArticleStateType = {
			fontFamilyOption:
				formState.fontFamilyOption || defaultArticleState.fontFamilyOption,
			fontColor:
				formState.fontColor || defaultArticleState.fontColor,
			backgroundColor:
				formState.backgroundColor || defaultArticleState.backgroundColor,
			contentWidth:
				formState.contentWidth || defaultArticleState.contentWidth,
			fontSizeOption:
				formState.fontSizeOption || defaultArticleState.fontSizeOption,
		};

		setArticleState(nonNullableOptions);
	}

	function onFormReset() {
		setArticleState(defaultArticleState);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={onFormSubmit} onReset={onFormReset} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
