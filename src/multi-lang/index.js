class MultiLang {
  static langModules = {};
  static defaultLangCode = "";
  static currentLangCode = "";

  constructor() {}

  static initialize(
    langModules = {},
    defaultLangCode = null,
    currentLangCode = null
  ) {
    MultiLang.langModules = langModules;
    if (defaultLangCode) {
      MultiLang.setDefaultLang(defaultLangCode);
    }
    if (currentLangCode) {
      MultiLang.setCurrentLang(currentLangCode);
    }
  }

  static setLangModules(langModules) {
    MultiLang.langModules = langModules;
  }

  // Update default language
  /**
   *
   * @param {*} langCode: string
   */
  static setDefaultLang(langCode) {
    MultiLang.defaultLangCode = langCode;
  }

  // Update default language
  /**
   *
   * @param {*} langCode: string
   */
  static setCurrentLang(langCode = null) {
    if (!langCode || !langCode.length) {
      MultiLang.currentLangCode = MultiLang.defaultLangCode;
      return;
    }
    MultiLang.currentLangCode = langCode;
  }

  /**
   *
   * @param {*} keyString: string
   * @param {*} dynamicVariables : Object {keyName: "Corresponding Value"}
   */
  getValueFromCurrentLang(keyString, dynamicVariables = {}) {
    // MultiLang.langModules[MultiLang.currentLangCode]
    const value = this.convertStringToIndex(
      MultiLang.langModules[MultiLang.currentLangCode],
      keyString
    )
    if (value) {
      if (Object.keys(dynamicVariables).length) {
        // Parse template with variables
        return this.replaceDynamicVariables(value, dynamicVariables)
      }
      return value;
    } else {
      return "";
    }
  }

  replaceDynamicVariables(templateString, dynamicVariables) {
    Object.keys(dynamicVariables).forEach(key => {
      templateString = templateString.replace("<<"+key+">>", dynamicVariables[key])
    })
    return templateString;
  }  

  convertStringToIndex(obj, is, value) {
    if (typeof is == "string") return this.convertStringToIndex(obj, is.split("."), value);
    else if (is.length == 1 && value !== undefined) return (obj[is[0]] = value);
    else if (is.length == 0) return obj;
    else return this.convertStringToIndex(obj[is[0]], is.slice(1), value);
  }
}

export default MultiLang;
