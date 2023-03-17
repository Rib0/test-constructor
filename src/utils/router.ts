import { Paths } from '@/constants';

export const insertPathParams = (path: Paths, params: Record<'id', string>) => {
	let finalPath: string = path;
	Object.entries(params).forEach(
		([paramName, value]) =>
			(finalPath = finalPath.replace(`[${paramName}]`, encodeURIComponent(value)))
	);

	return finalPath;
};
