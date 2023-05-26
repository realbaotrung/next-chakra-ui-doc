export type MixedArray = string | Array<string | string[]>

export function toArray(slug: MixedArray) {
  const res = Array.isArray(slug) ? slug.flat() : [slug]
  return res.filter(Boolean) // only return array that have value(s)
}

export function uniq<T>(c: T[]) {
  return [...new Set(c)]
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

export function groupBy(arr: Array<any>, criteria: any) {
	return arr.reduce(function (obj, item) {

		// Check if the criteria is a function to run on the item or a property of it
		const key = typeof criteria === 'function' ? criteria(item) : item[criteria];

		// If the key doesn't exist yet, create it
		// eslint-disable-next-line no-prototype-builtins
		if (!obj.hasOwnProperty(key)) {
			obj[key] = [];
		}

		// Push the value to the object
		obj[key].push(item);

		// Return the object to the next item in the loop
		return obj;

	}, {});
};
