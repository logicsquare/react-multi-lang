export const updateCurrentLanguage = (currentLang = 'en') => {
    return {
        type: "UPDATE_CURRENT_LANGUAGE",
        payload: {
            currentLang
        }
    }
}