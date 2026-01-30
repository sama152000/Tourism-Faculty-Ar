
export function slugify(text: string): string {
  return text
    .toString()
    .trim()
    .toLowerCase()
    // استبدال المسافات والشرطات السفلية بـ "-"
    .replace(/\s+/g, '-')
    .replace(/_+/g, '-')
    // السماح بالحروف العربية والإنجليزية والأرقام فقط
    .replace(/[^\u0621-\u064A\w\-]+/g, '')
    // استبدال الشرطات المتكررة بشرطة واحدة
    .replace(/\-\-+/g, '-')
    // إزالة الشرطات من البداية والنهاية
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
