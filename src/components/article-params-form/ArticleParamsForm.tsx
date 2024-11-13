import { SyntheticEvent } from 'react';
import { useState, useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

import {
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { useOutsideClickClose } from './hooks/useOutsideClickClose';

type formPropsType = {
	onSubmit: (formState: formStateType) => void;
	onReset: () => void;
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
	fontSizeOption: fontSizeOptions[0],
};

export const ArticleParamsForm = (props: formPropsType) => {
	const { onSubmit, onReset } = props;

	const [formState, setFormState] = useState<formStateType>(defaultFormState);

	const handleChange = (name: keyof formStateType, value: OptionType) => {
		setFormState((prevState: formStateType) => ({
			...prevState,
			[name]: value,
		}));
	};

	const [isOpen, setIsOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({ isOpen, rootRef, onChange: setIsOpen });

	const showForm = () => {
		setIsOpen(!isOpen);
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		onSubmit(formState);
	};

	const handleReset = () => {
		setFormState(defaultFormState);
		onReset();
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={showForm} />
			<aside
				className={clsx(styles.container, isOpen && styles[`container_open`])}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						title='Шрифт'
						placeholder='Выберите шрифт'
						selected={formState.fontFamilyOption}
						onChange={(option) => {
							handleChange('fontFamilyOption', option);
						}}
						onClose={() => {}}
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
						onClose={() => {}}
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
						onClose={() => {}}
						options={backgroundColors}
					/>
					<Select
						title='Ширина контента'
						placeholder='Выберите ширину контента'
						selected={formState.contentWidth}
						onChange={(option) => {
							handleChange('contentWidth', option);
						}}
						onClose={() => {}}
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
