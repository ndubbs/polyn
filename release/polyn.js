/*! polyn 2016-11-19 */
(function() {
    "use strict";
    var async = Async();
    if (typeof module !== "undefined" && module.exports) {
        module.exports = async;
    } else if (window) {
        window.polyn = window.polyn || {};
        Object.defineProperty(window.polyn, "async", {
            get: function() {
                return async;
            },
            set: function() {
                var err = new Error("[POLYN] polyn modules are read-only");
                console.log(err);
                return err;
            },
            enumerable: true,
            configurable: false
        });
    } else {
        console.log("[POLYN] Unable to define module: UNKNOWN RUNTIME");
    }
    function Async() {
        var async = {
            runAsync: undefined
        };
        async.runAsync = function(func, highPriority) {
            if (highPriority === true && typeof process !== "undefined" && typeof process.nextTick === "function") {
                process.nextTick(func);
            } else {
                setTimeout(func, 0);
            }
        };
        return async;
    }
})();

(function() {
    "use strict";
    var id = Id();
    if (typeof module !== "undefined" && module.exports) {
        module.exports = id;
    } else if (window) {
        window.polyn = window.polyn || {};
        Object.defineProperty(window.polyn, "id", {
            get: function() {
                return id;
            },
            set: function() {
                var err = new Error("[POLYN] polyn modules are read-only");
                console.log(err);
                return err;
            },
            enumerable: true,
            configurable: false
        });
    } else {
        console.log("[POLYN] Unable to define module: UNKNOWN RUNTIME");
    }
    function Id() {
        var id = {
            createUid: undefined,
            createGuid: undefined
        }, createRandomString;
        createRandomString = function(templateString) {
            return templateString.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
                return v.toString(16);
            });
        };
        id.createUid = function(length) {
            var template;
            length = length || 12;
            template = new Array(length + 1).join("x");
            return createRandomString(template);
        };
        id.createGuid = function() {
            return createRandomString("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx");
        };
        return id;
    }
})();

(function() {
    "use strict";
    var is = Is();
    if (typeof module !== "undefined" && module.exports) {
        module.exports = is;
    } else if (window) {
        window.polyn = window.polyn || {};
        Object.defineProperty(window.polyn, "is", {
            get: function() {
                return is;
            },
            set: function() {
                var err = new Error("[POLYN] polyn modules are read-only");
                console.log(err);
                return err;
            },
            enumerable: true,
            configurable: false
        });
    } else {
        console.log("[POLYN] Unable to define module: UNKNOWN RUNTIME");
    }
    function Is() {
        var is = {
            getType: undefined,
            defined: undefined,
            nullOrUndefined: undefined,
            function: undefined,
            object: undefined,
            array: undefined,
            string: undefined,
            bool: undefined,
            boolean: undefined,
            date: undefined,
            datetime: undefined,
            regexp: undefined,
            number: undefined,
            nullOrWhitespace: undefined,
            money: undefined,
            decimal: undefined,
            Window: undefined,
            not: {
                defined: undefined,
                function: undefined,
                object: undefined,
                array: undefined,
                string: undefined,
                bool: undefined,
                boolean: undefined,
                date: undefined,
                datetime: undefined,
                regexp: undefined,
                number: undefined,
                nullOrWhitespace: undefined,
                money: undefined,
                decimal: undefined,
                Window: undefined
            }
        }, class2Types = {}, class2ObjTypes = [ "Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object" ], i, name;
        for (i = 0; i < class2ObjTypes.length; i += 1) {
            name = class2ObjTypes[i];
            class2Types["[object " + name + "]"] = name.toLowerCase();
        }
        is.getType = function(obj) {
            if (typeof obj === "undefined") {
                return "undefined";
            }
            if (obj === null) {
                return String(obj);
            }
            return typeof obj === "object" || typeof obj === "function" ? class2Types[Object.prototype.toString.call(obj)] || "object" : typeof obj;
        };
        is.defined = function(obj) {
            try {
                return is.getType(obj) !== "undefined";
            } catch (e) {
                return false;
            }
        };
        is.not.defined = function(obj) {
            return is.defined(obj) === false;
        };
        is.nullOrUndefined = function(obj) {
            return is.not.defined(obj) || obj === null;
        };
        is.not.nullOrWhitespace = function(str) {
            if (typeof str === "undefined" || typeof str === null || is.not.string(str)) {
                return false;
            }
            return /([^\s])/.test(str);
        };
        is.nullOrWhitespace = function(str) {
            return is.not.nullOrWhitespace(str) === false;
        };
        is.function = function(obj) {
            return is.getType(obj) === "function";
        };
        is.not.function = function(obj) {
            return is.function(obj) === false;
        };
        is.object = function(obj) {
            return is.getType(obj) === "object";
        };
        is.not.object = function(obj) {
            return is.object(obj) === false;
        };
        is.array = function(obj) {
            return is.getType(obj) === "array";
        };
        is.not.array = function(obj) {
            return is.array(obj) === false;
        };
        is.string = function(obj) {
            return is.getType(obj) === "string";
        };
        is.not.string = function(obj) {
            return is.string(obj) === false;
        };
        is.bool = function(obj) {
            return is.getType(obj) === "boolean";
        };
        is.not.bool = function(obj) {
            return is.boolean(obj) === false;
        };
        is.boolean = function(obj) {
            return is.getType(obj) === "boolean";
        };
        is.not.boolean = function(obj) {
            return is.boolean(obj) === false;
        };
        is.datetime = function(obj) {
            return is.getType(obj) === "date" && !isNaN(obj.getTime());
        };
        is.not.datetime = function(obj) {
            return is.datetime(obj) === false;
        };
        is.date = is.datetime;
        is.not.date = is.not.datetime;
        is.regexp = function(obj) {
            return is.getType(obj) === "regexp";
        };
        is.not.regexp = function(obj) {
            return is.regexp(obj) === false;
        };
        is.number = function(obj) {
            return is.getType(obj) === "number";
        };
        is.not.number = function(obj) {
            return is.number(obj) === false;
        };
        is.money = function(val) {
            return is.defined(val) && /^(?:-)?[0-9]\d*(?:\.\d{0,2})?$/.test(val.toString());
        };
        is.not.money = function(val) {
            return is.money(val) === false;
        };
        is.decimal = function(num, places) {
            if (is.not.number(num)) {
                return false;
            }
            if (!places && is.number(num)) {
                return true;
            }
            if (!num || +(+num || 0).toFixed(places) !== +num) {
                return false;
            }
            return true;
        };
        is.not.decimal = function(val) {
            return is.decimal(val) === false;
        };
        is.Window = function(obj) {
            return is.defined(Window) && obj instanceof Window;
        };
        is.not.Window = function(obj) {
            return is.Window(obj) === false;
        };
        return is;
    }
})();

(function() {
    "use strict";
    var errorTypeWarning = "[POLYN] EXCEPTION WARNING: You should always pass an Error to Exception, to preserver your stack trace";
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Exception;
    } else if (window) {
        window.polyn = window.polyn || {};
        Object.defineProperty(window.polyn, "Exception", {
            get: function() {
                return Exception;
            },
            set: function() {
                var err = new Error("polyn modules are read-only");
                console.log(err);
                return err;
            },
            enumerable: true,
            configurable: false
        });
    } else {
        console.log("Unable to define module: UNKNOWN RUNTIME");
    }
    function normalizeType(type) {
        return typeof type === "string" ? type : "Exception";
    }
    function normalizeError(type, error) {
        if (typeof type === "object") {
            return type;
        }
        var err = error;
        if (typeof error === "string") {
            console.log(errorTypeWarning);
            err = new Error(error);
        } else if (!error) {
            console.log(errorTypeWarning);
            err = new Error("UNKNOWN");
        }
        return err;
    }
    function normalizeMessages(error, messages) {
        var msgs = [];
        if (Array.isArray(messages)) {
            msgs = messages;
        } else if (messages) {
            msgs.push(messages);
        } else if (!messages && error && error.message) {
            msgs.push(error.message);
        }
        return msgs;
    }
    function Exception(type, error, messages) {
        var err = normalizeError(type, error);
        return {
            type: normalizeType(type),
            error: err,
            messages: normalizeMessages(err, messages),
            isException: true
        };
    }
})();

(function() {
    "use strict";
    var bp;
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Ctor(require("./async.js"), require("./id.js"), require("./is.js"), require("./Exception.js"));
    } else if (window) {
        if (!window.polyn || !window.polyn.async || !window.polyn.id || !window.polyn.is || !window.polyn.Exception) {
            return console.log("Unable to define module: LOADED OUT OF ORDER");
        }
        bp = Ctor(window.polyn.async, window.polyn.id, window.polyn.is, window.polyn.Exception);
        Object.defineProperty(window.polyn, "Blueprint", {
            get: function() {
                return bp;
            },
            set: function() {
                var err = new Error("[POLYN] polyn modules are read-only");
                console.log(err);
                return err;
            },
            enumerable: true,
            configurable: false
        });
    } else {
        console.log("Unable to define module: UNKNOWN RUNTIME");
    }
    function Ctor(async, id, is, Exception) {
        var Blueprint, signatureMatches, syncSignatureMatches, validateSignature, syncValidateSignature, validateProperty, validatePropertyWithDetails, validatePropertyType, validateFunctionArguments, validateDecimalWithPlaces, validateBooleanArgument, validateNestedBlueprint, makeErrorMessage, setReadOnlyProp, config = {
            rememberValidation: true,
            compatibility: "v0.3.0"
        }, locale = {
            errors: {
                blueprint: {
                    requiresImplementation: "An implementation is required to create a new instance of an interface",
                    requiresProperty: "This implementation does not satisfy blueprint, {{blueprint}}. It should have the property, {{property}}, with type, {{type}}.",
                    requiresArguments: "This implementation does not satisfy blueprint, {{blueprint}}. The function, {{property}}, is missing arguments",
                    missingConstructorArgument: "An object literal is required when constructing a Blueprint",
                    missingSignaturesMatchBlueprintArgument: "The `blueprint` argument is required",
                    missingSignaturesMatchImplementationArgument: "The `implementation` argument is required",
                    missingSignaturesMatchCallbackArgument: "The `callback` argument is required"
                }
            }
        };
        signatureMatches = function(implementation, blueprint, callback) {
            var newCallback;
            if (config.rememberValidation) {
                if (config.compatibility === "v0.3.0") {
                    implementation.__interfaces = implementation.__interfaces || {};
                } else {
                    implementation.__blueprints = implementation.__blueprints || {};
                }
            }
            newCallback = function(err, result) {
                if (config.rememberValidation && !err) {
                    if (config.compatibility === "v0.3.0") {
                        implementation.__interfaces[blueprint.__blueprintId] = true;
                    } else {
                        implementation.__blueprints[blueprint.__blueprintId] = true;
                    }
                }
                if (typeof callback === "function") {
                    callback(err, result);
                }
            };
            validateSignature(implementation, blueprint, newCallback);
        };
        syncSignatureMatches = function(implementation, blueprint) {
            var validationResult;
            implementation.__interfaces = implementation.__interfaces || {};
            validationResult = syncValidateSignature(implementation, blueprint);
            if (validationResult.result) {
                implementation.__interfaces[blueprint.__blueprintId] = true;
            }
            return validationResult;
        };
        validateSignature = function(implementation, blueprint, callback) {
            async.runAsync(function() {
                var validationResult = syncValidateSignature(implementation, blueprint);
                if (validationResult.result) {
                    callback(null, true);
                } else {
                    callback(validationResult.errors, false);
                }
            });
        };
        syncValidateSignature = function(implementation, blueprint) {
            var errors = [], prop;
            if (implementation.__interfaces[blueprint.__blueprintId]) {
                return {
                    errors: null,
                    result: true
                };
            }
            for (prop in blueprint.props) {
                if (blueprint.props.hasOwnProperty(prop)) {
                    validateProperty(blueprint.__blueprintId, implementation, prop, blueprint.props[prop], errors);
                }
            }
            if (errors.length > 0) {
                return {
                    errors: errors,
                    result: false
                };
            } else {
                return {
                    errors: null,
                    result: true
                };
            }
        };
        validateProperty = function(blueprintId, implementation, propertyName, propertyValue, errors) {
            if (is.string(propertyValue)) {
                validatePropertyType(blueprintId, implementation, propertyName, propertyValue, errors);
            } else if (is.object(propertyValue)) {
                validatePropertyWithDetails(blueprintId, implementation, propertyName, propertyValue, propertyValue.type, errors);
            }
        };
        validatePropertyWithDetails = function(blueprintId, implementation, propertyName, propertyValue, type, errors) {
            if (propertyValue.required === false && (is.not.defined(implementation[propertyName]) || implementation[propertyName] === null)) {
                return;
            } else if (is.function(propertyValue.validate)) {
                propertyValue.validate(implementation[propertyName], errors, implementation);
            } else {
                switch (type) {
                  case "blueprint":
                    validateNestedBlueprint(propertyValue.blueprint, implementation, propertyName, errors);
                    break;

                  case "function":
                    validatePropertyType(blueprintId, implementation, propertyName, type, errors);
                    if (propertyValue.args) {
                        validateFunctionArguments(blueprintId, implementation, propertyName, propertyValue.args, errors);
                    }
                    break;

                  case "decimal":
                    validateDecimalWithPlaces(blueprintId, implementation, propertyName, propertyValue.places, errors);
                    break;

                  default:
                    validatePropertyType(blueprintId, implementation, propertyName, type, errors);
                    break;
                }
            }
        };
        makeErrorMessage = function(message, blueprintId, propertyName, propertyType) {
            return message.replace(/{{blueprint}}/gi, blueprintId).replace(/{{property}}/gi, propertyName).replace(/{{type}}/gi, propertyType);
        };
        validatePropertyType = function(blueprintId, implementation, propertyName, propertyType, errors) {
            if (is.function(is.not[propertyType]) && is.not[propertyType](implementation[propertyName])) {
                errors.push(makeErrorMessage(locale.errors.blueprint.requiresProperty, blueprintId, propertyName, propertyType));
            }
        };
        validateFunctionArguments = function(blueprintId, implementation, propertyName, propertyArguments, errors) {
            var argumentsAreValid, argumentsString;
            argumentsAreValid = is.array(propertyArguments);
            argumentsAreValid = argumentsAreValid && propertyArguments.length > 0;
            argumentsAreValid = argumentsAreValid && is.function(implementation[propertyName]);
            argumentsAreValid = argumentsAreValid && implementation[propertyName].length === propertyArguments.length;
            if (!argumentsAreValid) {
                try {
                    argumentsString = propertyArguments.join(", ");
                } catch (e) {
                    argumentsString = propertyArguments.toString();
                }
                errors.push(makeErrorMessage(locale.errors.blueprint.requiresArguments, blueprintId, propertyName, argumentsString));
            }
        };
        validateDecimalWithPlaces = function(blueprintId, implementation, propertyName, places, errors) {
            if (is.not.decimal(implementation[propertyName], places)) {
                errors.push(makeErrorMessage(locale.errors.blueprint.requiresProperty, blueprintId, propertyName, "decimal with " + places + " places"));
            }
        };
        validateBooleanArgument = function(blueprintId, implementation, propertyName, errors) {
            if (is.function(is.not.boolean) && is.not.boolean(implementation[propertyName])) {
                errors.push(makeErrorMessage(locale.errors.blueprint.requiresProperty, blueprintId, propertyName, "boolean"));
            }
        };
        validateNestedBlueprint = function(blueprint, implementation, propertyName, errors) {
            var validationResult = blueprint.syncSignatureMatches(implementation[propertyName]), i;
            if (!validationResult.result) {
                for (i = 0; i < validationResult.errors.length; i += 1) {
                    errors.push(validationResult.errors[i]);
                }
            }
        };
        setReadOnlyProp = function(obj, name, val) {
            Object.defineProperty(obj, name, {
                get: function() {
                    return val;
                },
                set: function() {
                    var err = new Exception("ReadOnlyViolation", new Error(name + " is read-only"));
                    console.log(err);
                    return err;
                },
                enumerable: true,
                configurable: false
            });
        };
        Blueprint = function(blueprint) {
            var self = {}, props = {}, prop;
            blueprint = blueprint || {};
            for (prop in blueprint) {
                if (blueprint.hasOwnProperty(prop)) {
                    if (prop === "__blueprintId") {
                        setReadOnlyProp(self, "__blueprintId", blueprint.__blueprintId);
                    } else {
                        props[prop] = blueprint[prop];
                    }
                }
            }
            if (is.not.string(self.__blueprintId)) {
                setReadOnlyProp(self, "__blueprintId", id.createUid(8));
            }
            setReadOnlyProp(self, "props", props);
            setReadOnlyProp(self, "validate", function(implementation, callback) {
                return Blueprint.validate(self, implementation, callback);
            });
            setReadOnlyProp(self, "signatureMatches", function(implementation, callback) {
                return Blueprint.validate(self, implementation, callback);
            });
            setReadOnlyProp(self, "syncSignatureMatches", function(implementation) {
                return Blueprint.syncValidate(self, implementation);
            });
            setReadOnlyProp(self, "inherits", function(otherBlueprint) {
                return Blueprint.syncMerge([ self, otherBlueprint ]);
            });
            return self;
        };
        Blueprint.validate = function(blueprint, implementation, callback) {
            if (is.not.function(callback)) {
                return Blueprint.syncValidate(blueprint, implementation);
            }
            if (is.not.defined(blueprint)) {
                callback([ locale.errors.blueprint.missingSignaturesMatchBlueprintArgument ]);
                return;
            }
            if (is.not.defined(implementation)) {
                callback([ locale.errors.blueprint.missingSignaturesMatchImplementationArgument ]);
                return;
            }
            async.runAsync(function() {
                signatureMatches(implementation, blueprint, callback);
            });
        };
        Blueprint.syncValidate = function(blueprint, implementation) {
            if (is.not.defined(blueprint)) {
                return {
                    errors: [ locale.errors.blueprint.missingSignaturesMatchBlueprintArgument ],
                    result: false
                };
            }
            if (is.not.defined(implementation)) {
                return {
                    errors: [ locale.errors.blueprint.missingSignaturesMatchImplementationArgument ],
                    result: false
                };
            }
            return syncSignatureMatches(implementation, blueprint);
        };
        Blueprint.merge = function(blueprints, callback) {
            if (typeof callback !== "function") {
                return Blueprint.syncMerge(blueprints);
            }
            async.runAsync(function() {
                callback(null, Blueprint.syncMerge(blueprints));
            });
        };
        Blueprint.syncMerge = function(blueprints) {
            var blueprint1, prop, next = true;
            if (!Array.isArray(blueprints)) {
                return null;
            }
            blueprint1 = blueprints.shift();
            while (next) {
                next = blueprints.shift();
                if (!next) {
                    break;
                }
                for (prop in next.props) {
                    if (next.props.hasOwnProperty(prop)) {
                        blueprint1.props[prop] = blueprint1.props[prop] || next.props[prop];
                    }
                }
            }
            return blueprint1;
        };
        Blueprint.configure = function(cfg) {
            cfg = cfg || {};
            if (typeof cfg.rememberValidation !== "undefined") {
                config.rememberValidation = cfg.rememberValidation;
            }
            if (typeof cfg.compatibility !== "undefined") {
                config.compatibility = cfg.compatibility;
            }
        };
        return Blueprint;
    }
})();

(function() {
    "use strict";
    var Immutable;
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Ctor(require("./Blueprint.js"), require("./Exception.js"));
    } else if (window) {
        if (!window.polyn || !window.polyn.Blueprint || !window.polyn.Exception) {
            return console.log("Unable to define module: LOADED OUT OF ORDER");
        }
        Immutable = Ctor(window.polyn.Blueprint, window.polyn.Exception);
        Object.defineProperty(window.polyn, "Immutable", {
            get: function() {
                return Immutable;
            },
            set: function() {
                var err = new Error("[POLYN] polyn modules are read-only");
                console.log(err);
                return err;
            },
            enumerable: true,
            configurable: false
        });
    } else {
        console.log("Unable to define module: UNKNOWN RUNTIME");
    }
    function Ctor(Blueprint, Exception) {
        var config = {
            onError: function(exception) {
                console.log(exception);
            }
        };
        function Immutable(schema) {
            var blueprint;
            if (!schema) {
                return new InvalidArgumentException(new Error("A schema object, and values are required"));
            }
            blueprint = new Blueprint(schema);
            function Constructor(values) {
                var propName, internal = {}, self = {};
                values = values || {};
                if (schema.__skipValdation !== true && !blueprint.syncSignatureMatches(values).result) {
                    return new InvalidArgumentException(new Error("The argument passed to the constructor is not valid"), blueprint.syncSignatureMatches(values).errors);
                }
                try {
                    for (propName in schema) {
                        if (schema.hasOwnProperty(propName) && typeof values[propName] !== "undefined") {
                            makeImmutableProperty(self, internal, schema, values, propName);
                        } else if (schema.hasOwnProperty(propName)) {
                            makeReadOnlyNullProperty(self, propName);
                        }
                    }
                } catch (e) {
                    return new InvalidArgumentException(e);
                }
                return self;
            }
            Constructor.merge = function(from, mergeVals) {
                return new Constructor(merge(from, mergeVals));
            };
            Constructor.toObject = function(from) {
                return toObject(from, {});
            };
            Constructor.validate = function(instance) {
                return blueprint.syncSignatureMatches(instance);
            };
            Constructor.log = function(instance) {
                if (!instance) {
                    console.log(null);
                } else {
                    console.log(Constructor.toObject(instance));
                }
            };
            Constructor.__immutableCtor = true;
            return Constructor;
        }
        function makeImmutableProperty(self, internal, schema, values, propName) {
            if (typeof schema[propName] && schema[propName].__immutableCtor) {
                internal[propName] = new schema[propName](values[propName]);
            } else {
                internal[propName] = copyValue(values[propName]);
            }
            Object.defineProperty(self, propName, {
                get: function() {
                    return internal[propName];
                },
                set: function() {
                    var err = new Exception("ReadOnlyViolation", new Error("Cannot set `" + propName + "`. This object is immutable"));
                    config.onError(err);
                    return err;
                },
                enumerable: true,
                configurable: false
            });
        }
        function makeReadOnlyNullProperty(self, propName) {
            Object.defineProperty(self, propName, {
                get: function() {
                    return null;
                },
                set: function() {
                    var err = new Exception("ReadOnlyViolation", new Error("Cannot set `" + propName + "`. This object is immutable"));
                    config.onError(err);
                    return err;
                },
                enumerable: true,
                configurable: false
            });
        }
        function copyValue(val) {
            if (!val) {
                return val;
            }
            if (typeof val === "object" && Object.prototype.toString.call(val) === "[object Date]") {
                return new Date(val);
            } else if (typeof val === "object") {
                return JSON.parse(JSON.stringify(val));
            } else {
                return JSON.parse(JSON.stringify(val));
            }
        }
        function InvalidArgumentException(error, messages) {
            return new Exception("InvalidArgumentException", error, messages);
        }
        function merge(from, mergeVals) {
            var newVals = toObject(from, false), propName;
            for (propName in mergeVals) {
                if (mergeVals.hasOwnProperty(propName) && typeof mergeVals[propName] === "object") {
                    newVals[propName] = merge(newVals[propName], mergeVals[propName]);
                } else if (mergeVals.hasOwnProperty(propName)) {
                    newVals[propName] = mergeVals[propName];
                }
            }
            return newVals;
        }
        function toObject(from, deep) {
            var newVals = {}, propName;
            if (typeof deep === "undefined") {
                deep = true;
            }
            for (propName in from) {
                if (from.hasOwnProperty(propName) && typeof from[propName] === "object" && deep) {
                    newVals[propName] = toObject(from[propName]);
                } else if (from.hasOwnProperty(propName)) {
                    newVals[propName] = copyValue(from[propName]);
                }
            }
            return newVals;
        }
        Immutable.configure = function(cfg) {
            cfg = cfg || {};
            if (typeof cfg.onError === "function") {
                config.onError = cfg.onError;
            }
        };
        return Immutable;
    }
})();