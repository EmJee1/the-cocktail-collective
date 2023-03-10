import { zodResolver } from '@hookform/resolvers/zod'
import { type FieldValues, type FormState, useForm } from 'react-hook-form'
import { z, type Schema } from 'zod'

export default function useZodForm<T extends FieldValues>(schema: Schema<T>) {
	type FormValues = z.infer<typeof schema>
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
	})

	const formError = getErrorMessage(form.formState)
	const errorByName = getErrorMessagesByName<FormValues>(form.formState)

	return {
		...form,
		formError,
		errorByName,
	}
}

function getErrorMessage(formState: FormState<any>) {
	const fields = Object.keys(formState.errors)
	if (!fields.length) {
		return
	}

	if (fields.length === 1) {
		return `Check the field ${fields.at(0)}`
	}

	const formatter = new Intl.ListFormat('en', {
		style: 'long',
		type: 'conjunction',
	})
	return `Check the fields ${formatter.format(fields)}`
}

function getErrorMessagesByName<T extends FieldValues>(
	formState: FormState<T>
): Record<keyof T, string> {
	const fields = Object.entries(formState.errors)
	return Object.fromEntries(
		fields
			.map(([field, error]) => [field, error?.message])
			.filter(([, err]) => err)
	)
}
