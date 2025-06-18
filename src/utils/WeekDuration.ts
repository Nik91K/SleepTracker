function validateDuration(duration?: string | null): string {
    if (!duration) return 'Немає даних';

    const validate = /^([0-9]|[1-9]\d):([0-5]\d)$/

    if (validate.test(duration)) {
        const [hours, minutes] = duration.split(':').map(Number);
        if (hours === 0 && minutes === 0) {
            return 'Немає даних'
        }
        return `${hours} год ${minutes > 0 ? `${minutes} хв` : ''}`.trim()
    }

    return 'Немає даних'
}

export default validateDuration;
