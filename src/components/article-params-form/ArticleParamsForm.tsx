import { SyntheticEvent } from 'react';
import { useState, useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

import {
	defaultArticleState,
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

import { useClose } from './hooks/useClose';

type formPropsType = {
	setArticleState: (value: React.SetStateAction<ArticleStateType>) => void;
};

// Отдельный стейт для формы, поскольку ключи могут принимать значение null для
// отображения плэйсхолдеров

export type formStateType = {
	fontFamilyOption: null | OptionType;
	fontColor: null | OptionType;
	backgroundColor: null | OptionType;
	contentWidth: null | OptionType;
	fontSizeOption: OptionType;
};

const defaultFormState: formStateType = {
	fontFamilyOption: null,
	fontColor: null,
	backgroundColor: null,
	contentWidth: null,
	fontSizeOption: defaultArticleState.fontSizeOption,
};

export const ArticleParamsForm = (props: formPropsType) => {
	const { setArticleState } = props;

	const [formState, setFormState] = useState<formStateType>(defaultFormState);

	const handleChange = (name: keyof formStateType, value: OptionType) => {
		setFormState((prevState: formStateType) => ({
			...prevState,
			[name]: value,
		}));
	};

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const rootRef = useRef<HTMLDivElement>(null);

	useClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => {
			setIsMenuOpen(false);
		},
	});

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const nonNullableOptions: ArticleStateType = {
			fontFamilyOption:
				formState.fontFamilyOption || defaultArticleState.fontFamilyOption,
			fontColor: formState.fontColor || defaultArticleState.fontColor,
			backgroundColor:
				formState.backgroundColor || defaultArticleState.backgroundColor,
			contentWidth: formState.contentWidth || defaultArticleState.contentWidth,
			fontSizeOption:
				formState.fontSizeOption || defaultArticleState.fontSizeOption,
		};

		setArticleState(nonNullableOptions);
	};

	const onReset = () => {
		setFormState(defaultFormState);
		setArticleState(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
			<aside
				className={clsx(styles.container, {
					[styles[`container_open`]]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text as={'h2'} size={31} uppercase weight={800} family={'open-sans'}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						placeholder='Выберите шрифт'
						selected={formState.fontFamilyOption}
						onChange={(option) => {
							handleChange('fontFamilyOption', option);
						}}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						name={'fontSize'}
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => {
							handleChange('fontSizeOption', option);
						}}
					/>
					<Select
						title='Цвет шрифта'
						placeholder='Выберите цвет шрифта'
						selected={formState.fontColor}
						onChange={(option) => {
							handleChange('fontColor', option);
						}}
						options={fontColors}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						placeholder='Выберите цвет фона'
						selected={formState.backgroundColor}
						onChange={(option) => {
							handleChange('backgroundColor', option);
						}}
						options={backgroundColors}
					/>
					<Select
						title='Ширина контента'
						placeholder='Выберите ширину контента'
						selected={formState.contentWidth}
						onChange={(option) => {
							handleChange('contentWidth', option);
						}}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
