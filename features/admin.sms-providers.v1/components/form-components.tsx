/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import Alert from "@oxygen-ui/react/Alert";
import AlertTitle from "@oxygen-ui/react/AlertTitle";
import Button from "@oxygen-ui/react/Button";
import InputAdornment from "@oxygen-ui/react/InputAdornment";
import { FinalFormField, TextFieldAdapter } from "@wso2is/form";
import { Hint } from "@wso2is/react-components";
import { FormApi } from "final-form";
import React, { FunctionComponent, MutableRefObject, ReactElement } from "react";
import { Trans } from "react-i18next";
import { Icon } from "semantic-ui-react";

/**
 * Props interface for SecretInputAdornment component.
 */
export interface SecretInputAdornmentPropsInterface {
    /**
     * Whether the secret is currently shown.
     */
    showSecret: boolean;
    /**
     * Callback function to toggle secret visibility.
     */
    onClick: () => void;
    /**
     * Component ID for testing.
     */
    "data-componentid"?: string;
}

/**
 * A reusable component that renders an input adornment for toggling secret visibility.
 *
 * @param props - Props injected to the component.
 * @returns Secret input adornment component.
 */
export const SecretInputAdornment: FunctionComponent<SecretInputAdornmentPropsInterface> = (
    props: SecretInputAdornmentPropsInterface
): ReactElement => {
    const {
        showSecret,
        onClick,
        "data-componentid": componentId = "secret-input-adornment"
    } = props;

    return (
        <InputAdornment position="end">
            <Icon
                link={ true }
                className="list-icon reset-field-to-default-adornment"
                size="small"
                color="grey"
                name={ !showSecret ? "eye" : "eye slash" }
                data-componentid={ `${componentId}-secret-view-button` }
                onClick={ onClick }
            />
        </InputAdornment>
    );
};

/**
 * Helper function to render an input adornment for secret fields.
 * This is a convenience function that wraps the SecretInputAdornment component.
 *
 * @param showSecret - Whether the secret is currently shown.
 * @param onClick - Callback function to toggle secret visibility.
 * @param componentId - Optional component ID for testing.
 * @returns Secret input adornment element.
 */
export const renderInputAdornmentOfSecret = (
    showSecret: boolean,
    onClick: () => void,
    componentId?: string
): ReactElement => {
    return (
        <SecretInputAdornment
            showSecret={ showSecret }
            onClick={ onClick }
            data-componentid={ componentId }
        />
    );
};

/**
 * Props interface for AuthenticationSectionInfoBox component.
 */
export interface AuthenticationSectionInfoBoxPropsInterface {
    /**
     * The display name of the current authentication type.
     */
    authTypeDisplayName: string;
    /**
     * The info title translation key.
     */
    infoTitleTranslationKey: string;
    /**
     * The info message translation key.
     */
    infoMessageTranslationKey: string;
    /**
     * The change button text translation key.
     */
    changeButtonTextTranslationKey: string;
    /**
     * Callback function when change authentication button is clicked.
     */
    onChangeAuthentication: () => void;
    /**
     * Component ID for testing.
     */
    "data-componentid"?: string;
}

/**
 * A reusable component that renders an info box for authentication section.
 *
 * @param props - Props injected to the component.
 * @returns Authentication section info box component.
 */
export const AuthenticationSectionInfoBox: FunctionComponent<AuthenticationSectionInfoBoxPropsInterface> = (
    props: AuthenticationSectionInfoBoxPropsInterface
): ReactElement => {
    const {
        authTypeDisplayName,
        infoTitleTranslationKey,
        infoMessageTranslationKey,
        changeButtonTextTranslationKey,
        onChangeAuthentication,
        "data-componentid": componentId = "authentication-section-info-box"
    } = props;

    return (
        <Alert className="alert-nutral" icon={ false }>
            <AlertTitle
                className="alert-title"
                data-componentid={ `${componentId}-title` }
            >
                <Trans
                    i18nKey={ infoTitleTranslationKey }
                    values={ { authType: authTypeDisplayName } }
                    components={ { strong: <strong/> } }
                />
            </AlertTitle>
            <Trans i18nKey={ infoMessageTranslationKey }>
                If you are changing the authentication, be aware that the authentication secrets of
                the external endpoint need to be updated.
            </Trans>
            <div>
                <Button
                    onClick={ onChangeAuthentication }
                    variant="outlined"
                    size="small"
                    className="secondary-button"
                    data-componentid={ `${componentId}-change-button` }
                >
                    <Trans i18nKey={ changeButtonTextTranslationKey }>
                        Change Authentication
                    </Trans>
                </Button>
            </div>
        </Alert>
    );
};

/**
 * Helper function to render an authentication section info box.
 * This is a convenience function that wraps the AuthenticationSectionInfoBox component.
 *
 * @param authTypeDisplayName - The display name of the current authentication type.
 * @param infoTitleTranslationKey - The info title translation key.
 * @param infoMessageTranslationKey - The info message translation key.
 * @param changeButtonTextTranslationKey - The change button text translation key.
 * @param onChangeAuthentication - Callback function when change authentication button is clicked.
 * @param componentId - Optional component ID for testing.
 * @returns Authentication section info box element.
 */
export const renderAuthenticationSectionInfoBox = (
    authTypeDisplayName: string,
    infoTitleTranslationKey: string,
    infoMessageTranslationKey: string,
    changeButtonTextTranslationKey: string,
    onChangeAuthentication: () => void,
    componentId?: string
): ReactElement => {
    return (
        <AuthenticationSectionInfoBox
            authTypeDisplayName={ authTypeDisplayName }
            infoTitleTranslationKey={ infoTitleTranslationKey }
            infoMessageTranslationKey={ infoMessageTranslationKey }
            changeButtonTextTranslationKey={ changeButtonTextTranslationKey }
            onChangeAuthentication={ onChangeAuthentication }
            data-componentid={ componentId }
        />
    );
};

/**
 * Props interface for AuthSecretsHint component.
 */
export interface AuthSecretsHintPropsInterface {
    /**
     * Whether to show update hint or create hint.
     */
    isUpdate: boolean;
    /**
     * Translation key for create hint.
     */
    createHintTranslationKey: string;
    /**
     * Translation key for update hint.
     */
    updateHintTranslationKey: string;
}

/**
 * A reusable component that renders a hint for authentication secrets.
 *
 * @param props - Props injected to the component.
 * @returns Auth secrets hint component.
 */
export const AuthSecretsHint: FunctionComponent<AuthSecretsHintPropsInterface> = (
    props: AuthSecretsHintPropsInterface
): ReactElement => {
    const {
        isUpdate,
        createHintTranslationKey,
        updateHintTranslationKey
    } = props;

    return (
        <Hint className="hint-text" compact>
            <Trans i18nKey={ isUpdate ? updateHintTranslationKey : createHintTranslationKey } />
        </Hint>
    );
};

/**
 * Helper function to render authentication secrets hint.
 *
 * @param isUpdate - Whether to show update hint or create hint.
 * @param createHintTranslationKey - Translation key for create hint.
 * @param updateHintTranslationKey - Translation key for update hint.
 * @returns Auth secrets hint element.
 */
export const showAuthSecretsHint = (
    isUpdate: boolean,
    createHintTranslationKey: string,
    updateHintTranslationKey: string
): ReactElement => {
    return (
        <AuthSecretsHint
            isUpdate={ isUpdate }
            createHintTranslationKey={ createHintTranslationKey }
            updateHintTranslationKey={ updateHintTranslationKey }
        />
    );
};

/**
 * Props interface for EndpointAuthPropertyFields component.
 */
export interface EndpointAuthPropertyFieldsPropsInterface {
    /**
     * Authentication type.
     */
    authType: string;
    /**
     * Whether to show primary secret field.
     */
    showPrimarySecret: boolean;
    /**
     * Whether to show secondary secret field.
     */
    showSecondarySecret: boolean;
    /**
     * Callback to toggle primary secret visibility.
     */
    onTogglePrimarySecret: () => void;
    /**
     * Callback to toggle secondary secret visibility.
     */
    onToggleSecondarySecret: () => void;
    /**
     * Translation function.
     */
    t: (key: string) => string;
    /**
     * Component ID for testing.
     */
    componentId: string;
    /**
     * Is read-only mode.
     */
    isReadOnly: boolean;
}

/**
 * A reusable component that renders endpoint authentication property fields based on auth type.
 *
 * @param props - Props injected to the component.
 * @returns Endpoint auth property fields component.
 */
export const EndpointAuthPropertyFields: FunctionComponent<EndpointAuthPropertyFieldsPropsInterface> = (
    props: EndpointAuthPropertyFieldsPropsInterface
): ReactElement => {
    const {
        authType,
        showPrimarySecret,
        showSecondarySecret,
        onTogglePrimarySecret,
        onToggleSecondarySecret,
        t,
        componentId,
        isReadOnly
    } = props;

    switch (authType) {
        case "BASIC":
            return (
                <>
                    <FinalFormField
                        key="userName"
                        fullWidth
                        FormControlProps={ {
                            margin: "dense"
                        } }
                        ariaLabel="username"
                        readOnly={ isReadOnly }
                        required={ true }
                        data-componentid={ `${componentId}-endpoint-authentication-property-username` }
                        name="userName"
                        type={ showPrimarySecret ? "text" : "password" }
                        label={ t("externalApiAuthentication:fields.authenticationTypeDropdown.authProperties.username.label") }
                        placeholder={ t(
                            "externalApiAuthentication:fields.authenticationTypeDropdown.authProperties.username.placeholder"
                        ) }
                        component={ TextFieldAdapter }
                        maxLength={ 100 }
                        minLength={ 0 }
                        autoComplete="new-password"
                        InputProps={ {
                            endAdornment: (
                                <SecretInputAdornment
                                    showSecret={ showPrimarySecret }
                                    onClick={ onTogglePrimarySecret }
                                    data-componentid={ `${componentId}-endpoint-authentication-property-username-toggle` }
                                />
                            )
                        } }
                    />
                    <FinalFormField
                        key="password"
                        fullWidth
                        FormControlProps={ {
                            margin: "dense"
                        } }
                        ariaLabel="password"
                        readOnly={ isReadOnly }
                        required={ true }
                        data-componentid={ `${componentId}-endpoint-authentication-property-password` }
                        name="password"
                        type={ showSecondarySecret ? "text" : "password" }
                        label={ t("externalApiAuthentication:fields.authenticationTypeDropdown.authProperties.password.label") }
                        placeholder={ t(
                            "externalApiAuthentication:fields.authenticationTypeDropdown.authProperties.password.placeholder"
                        ) }
                        component={ TextFieldAdapter }
                        maxLength={ 100 }
                        minLength={ 0 }
                        autoComplete="new-password"
                        InputProps={ {
                            endAdornment: (
                                <SecretInputAdornment
                                    showSecret={ showSecondarySecret }
                                    onClick={ onToggleSecondarySecret }
                                    data-componentid={ `${componentId}-endpoint-authentication-property-password-toggle` }
                                />
                            )
                        } }
                    />
                </>
            );
        case "CLIENT_CREDENTIAL":
            return (
                <>
                    <FinalFormField
                        key="clientId"
                        fullWidth
                        FormControlProps={ {
                            margin: "dense"
                        } }
                        ariaLabel="clientId"
                        readOnly={ isReadOnly }
                        required={ true }
                        data-componentid={ `${componentId}-endpoint-authentication-property-clientId` }
                        name="clientId"
                        type={ showPrimarySecret ? "text" : "password" }
                        label={ t("externalApiAuthentication:fields.authenticationTypeDropdown.authProperties.clientID.label") }
                        placeholder={ t(
                            "externalApiAuthentication:fields.authenticationTypeDropdown.authProperties.clientID.placeholder"
                        ) }
                        component={ TextFieldAdapter }
                        maxLength={ 100 }
                        minLength={ 0 }
                        autoComplete="new-password"
                        InputProps={ {
                            endAdornment: (
                                <SecretInputAdornment
                                    showSecret={ showPrimarySecret }
                                    onClick={ onTogglePrimarySecret }
                                    data-componentid={ `${componentId}-endpoint-authentication-property-clientId-toggle` }
                                />
                            )
                        } }
                    />
                    <FinalFormField
                        key="clientSecret"
                        fullWidth
                        FormControlProps={ {
                            margin: "dense"
                        } }
                        ariaLabel="clientSecret"
                        readOnly={ isReadOnly }
                        required={ true }
                        data-componentid={ `${componentId}-endpoint-authentication-property-clientSecret` }
                        name="clientSecret"
                        type={ showSecondarySecret ? "text" : "password" }
                        label={ t(
                            "externalApiAuthentication:fields.authenticationTypeDropdown.authProperties.clientSecret.label"
                        ) }
                        placeholder={ t(
                            "externalApiAuthentication:fields.authenticationTypeDropdown.authProperties.clientSecret.placeholder"
                        ) }
                        component={ TextFieldAdapter }
                        maxLength={ 100 }
                        minLength={ 0 }
                        autoComplete="new-password"
                        InputProps={ {
                            endAdornment: (
                                <SecretInputAdornment
                                    showSecret={ showSecondarySecret }
                                    onClick={ onToggleSecondarySecret }
                                    data-componentid={ `${componentId}-endpoint-authentication-property-clientSecret-toggle` }
                                />
                            )
                        } }
                    />
                    <FinalFormField
                        key="tokenEndpoint"
                        fullWidth
                        FormControlProps={ {
                            margin: "dense"
                        } }
                        ariaLabel="tokenEndpoint"
                        readOnly={ isReadOnly }
                        required={ true }
                        data-componentid={ `${componentId}-endpoint-authentication-property-tokenEndpoint` }
                        name="tokenEndpoint"
                        type="text"
                        label={ t(
                            "externalApiAuthentication:fields.authenticationTypeDropdown.authProperties.tokenEndpoint.label"
                        ) }
                        placeholder={ t(
                            "externalApiAuthentication:fields.authenticationTypeDropdown.authProperties.tokenEndpoint.placeholder"
                        ) }
                        component={ TextFieldAdapter }
                        maxLength={ 100 }
                        minLength={ 0 }
                        autoComplete="new-password"
                    />
                    <FinalFormField
                        key="scopes"
                        fullWidth
                        FormControlProps={ {
                            margin: "dense"
                        } }
                        ariaLabel="scopes"
                        readOnly={ isReadOnly }
                        required={ true }
                        data-componentid={ `${componentId}-endpoint-authentication-property-scopes` }
                        name="scopes"
                        type="text"
                        label={ t("externalApiAuthentication:fields.authenticationTypeDropdown.authProperties.scopes.label") }
                        placeholder={ t(
                            "externalApiAuthentication:fields.authenticationTypeDropdown.authProperties.scopes.placeholder"
                        ) }
                        component={ TextFieldAdapter }
                        maxLength={ 100 }
                        minLength={ 0 }
                        autoComplete="new-password"
                    />
                </>
            );
        default:
            return null;
    }
};

/**
 * Helper function to render endpoint authentication property fields.
 *
 * @param authType - Authentication type.
 * @param showPrimarySecret - Whether to show primary secret field.
 * @param showSecondarySecret - Whether to show secondary secret field.
 * @param onTogglePrimarySecret - Callback to toggle primary secret visibility.
 * @param onToggleSecondarySecret - Callback to toggle secondary secret visibility.
 * @param t - Translation function.
 * @param componentId - Component ID for testing.
 * @param isReadOnly - Is read-only mode.
 * @returns Endpoint auth property fields element.
 */
export const renderEndpointAuthPropertyFields = (
    authType: string,
    showPrimarySecret: boolean,
    showSecondarySecret: boolean,
    onTogglePrimarySecret: () => void,
    onToggleSecondarySecret: () => void,
    t: (key: string) => string,
    componentId: string,
    isReadOnly: boolean
): ReactElement => {
    return (
        <EndpointAuthPropertyFields
            authType={ authType }
            showPrimarySecret={ showPrimarySecret }
            showSecondarySecret={ showSecondarySecret }
            onTogglePrimarySecret={ onTogglePrimarySecret }
            onToggleSecondarySecret={ onToggleSecondarySecret }
            t={ t }
            componentId={ componentId }
            isReadOnly={ isReadOnly }
        />
    );
};

/**
 * Interface for authentication form reset parameters.
 */
export interface AuthenticationFormResetParams {
    /**
     * Form state reference containing the form API.
     */
    formState: MutableRefObject<FormApi<any>>;
    /**
     * Setter function to update authentication form state.
     */
    setIsAuthenticationUpdateFormState: (state: boolean) => void;
    /**
     * Optional array of field names to reset. If not provided, default authentication fields will be reset.
     */
    fieldsToReset?: string[];
}

/**
 * Default authentication fields that will be reset.
 */
const DEFAULT_AUTH_FIELDS: string[] = [
    "userName",
    "password",
    "clientId",
    "clientSecret",
    "tokenEndpoint",
    "scopes"
];

/**
 * Utility function to handle authentication form cancellation.
 * Resets the form fields and updates the authentication form state.
 *
 * @param params - Parameters for resetting the authentication form.
 */
export const handleAuthenticationFormCancel = (params: AuthenticationFormResetParams): void => {
    const {
        formState,
        setIsAuthenticationUpdateFormState,
        fieldsToReset = DEFAULT_AUTH_FIELDS
    } = params;

    setIsAuthenticationUpdateFormState(false);

    if (formState.current) {
        fieldsToReset.forEach((fieldName: string) => {
            formState.current.change(fieldName, "");
        });
    }
};
