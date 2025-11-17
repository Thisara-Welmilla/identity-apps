/**
 * Copyright (c) 2023-2024, WSO2 LLC. (https://www.wso2.com).
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

import Box from "@oxygen-ui/react/Box";
import Button from "@oxygen-ui/react/Button";
import MenuItem from "@oxygen-ui/react/MenuItem";
import TextField from "@oxygen-ui/react/TextField";
import { IdentifiableComponentInterface } from "@wso2is/core/models";
import { FormApi } from "final-form";
import { FinalFormField, TextFieldAdapter } from "@wso2is/form";
import {
    EmphasizedSegment,
    Heading,
    Hint,
    PrimaryButton
} from "@wso2is/react-components";
import React, { FunctionComponent, MutableRefObject, ReactElement, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Grid } from "semantic-ui-react";
import {
    handleAuthenticationFormCancel,
    renderAuthenticationSectionInfoBox,
    renderEndpointAuthPropertyFields,
    showAuthSecretsHint
} from "../components";
import {
    AuthenticationType,
    DropdownChild,
    SMSProviderConstants
} from "../constants/sms-provider-constants";
import "./custom-sms-provider.scss";

interface CustomSMSProviderPageInterface extends IdentifiableComponentInterface {
    isLoading?: boolean;
    isReadOnly: boolean;
    "data-componentid": string;
    onSubmit: (values: any) => void;
    originalSMSProviderConfig?: any[];
    isAuthenticationUpdateFormState?: boolean;
    setIsAuthenticationUpdateFormState?: (state: boolean) => void;
    formState?: MutableRefObject<FormApi<any>>;
}

const CustomSMSProvider: FunctionComponent<CustomSMSProviderPageInterface> = (
    props: CustomSMSProviderPageInterface
): ReactElement => {

    const {
        ["data-componentid"]: componentId,
        isLoading,
        isReadOnly,
        onSubmit,
        originalSMSProviderConfig,
        isAuthenticationUpdateFormState: externalIsAuthenticationUpdateFormState,
        setIsAuthenticationUpdateFormState: externalSetIsAuthenticationUpdateFormState,
        formState: externalFormState
    } = props;

    const { t } = useTranslation();

    const internalFormState: MutableRefObject<FormApi<any>> = useRef<FormApi>(null);
    const formState = externalFormState || internalFormState;

    const [ isAuthenticationUpdateFormState, setIsAuthenticationUpdateFormState ] = useState<boolean>(
        externalIsAuthenticationUpdateFormState || false
    );
    const [ endpointAuthType, setEndpointAuthType ] = useState<AuthenticationType>(null);
    const [ showPrimarySecret, setShowPrimarySecret ] = useState<boolean>(false);
    const [ showSecondarySecret, setShowSecondarySecret ] = useState<boolean>(false);

    const handleAuthenticationChangeCancel = (): void => {
        handleAuthenticationFormCancel({
            formState,
            setIsAuthenticationUpdateFormState: externalSetIsAuthenticationUpdateFormState || setIsAuthenticationUpdateFormState
        });
    };

    const resolveAuthTypeDisplayName = (): string => {
        if (originalSMSProviderConfig && originalSMSProviderConfig[0]) {
            return SMSProviderConstants.AUTH_TYPES.find(
                (type: DropdownChild) => type.value === originalSMSProviderConfig[0]?.authType
            )?.text || originalSMSProviderConfig[0]?.authType;
        }

        return "";
    };

    const renderAuthenticationSectionInfoBoxWrapper = (): ReactElement => {
        return renderAuthenticationSectionInfoBox(
            resolveAuthTypeDisplayName(),
            t("actions:fields.authentication.info.title.otherAuthType",
                { authType: resolveAuthTypeDisplayName() }),
            t("actions:fields.authentication.info.message"),
            t("actions:buttons.changeAuthentication"),
            handleAuthenticationChange,
            `${componentId}-authentication-info-box`
        );
    };

    const showAuthSecretsHintWrapper = (): ReactElement => {
        return showAuthSecretsHint(
            !!(originalSMSProviderConfig && originalSMSProviderConfig[0]),
            "smsProviders:fields.authenticationTypeDropdown.hint.create",
            "smsProviders:fields.authenticationTypeDropdown.hint.update"
        );
    };

    const renderEndpointAuthPropertyFieldsWrapper = (): ReactElement => {
        return renderEndpointAuthPropertyFields(
            endpointAuthType,
            showPrimarySecret,
            showSecondarySecret,
            () => setShowPrimarySecret(!showPrimarySecret),
            () => setShowSecondarySecret(!showSecondarySecret),
            t,
            componentId,
            isReadOnly
        );
    };

    const handleDropdownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndpointAuthType(event.target.value as AuthenticationType);
    };

    const handleAuthenticationChange = (): void => {
        const setter = externalSetIsAuthenticationUpdateFormState || setIsAuthenticationUpdateFormState;
        setter(true);
        if (originalSMSProviderConfig && originalSMSProviderConfig[0]) {
            handleDropdownChange({ target: { value: originalSMSProviderConfig[0]?.authType } } as any);
            if (originalSMSProviderConfig[0]?.authType === AuthenticationType.BASIC) {
                formState.current?.change("userName", originalSMSProviderConfig[0].properties
                    ?.find((property: any) => property.key === SMSProviderConstants.USERNAME)?.value);
                formState.current?.change("password", null);
            } else if (originalSMSProviderConfig[0]?.authType === AuthenticationType.CLIENT_CREDENTIAL) {
                formState.current?.change("clientId", originalSMSProviderConfig[0].properties
                    ?.find((property: any) => property.key === SMSProviderConstants.CLIENT_ID)?.value);
                formState.current?.change("tokenEndpoint", originalSMSProviderConfig[0].properties
                    ?.find((property: any) => property.key === SMSProviderConstants.TOKEN_ENDPOINT)?.value);
                formState.current?.change("scopes", originalSMSProviderConfig[0].properties
                    ?.find((property: any) => property.key === SMSProviderConstants.SCOPES)?.value);
                formState.current?.change("clientSecret", null);
            }
        }
    };

    const currentIsAuthenticationUpdateFormState = externalIsAuthenticationUpdateFormState !== undefined
        ? externalIsAuthenticationUpdateFormState
        : isAuthenticationUpdateFormState;

    return (
        <div className="custom-sms-provider-page">
            <EmphasizedSegment
                className="form-wrapper"
                padded={ "very" }
                data-componentid={ `${componentId}-tab` }
            >
            <Grid>
                <Grid.Row columns={ 1 }>
                    <Grid.Column>
                        <h2>{ t("smsProviders:form.custom.subHeading") }</h2>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={ 2 }>
                    <Grid.Column>
                        <FinalFormField
                            key="providerURL"
                            fullWidth
                            FormControlProps={ {
                                margin: "dense"
                            } }
                            ariaLabel="providerURL"
                            readOnly={ isReadOnly }
                            required={ true }
                            data-componentid={ `${componentId}-providerURL` }
                            name="providerURL"
                            type="text"
                            label={ t("smsProviders:form.custom.providerUrl.label") }
                            placeholder={ t("smsProviders:form.custom." +
                                "providerUrl.placeholder") }
                            helperText={ (
                                <Hint compact>
                                    { t("smsProviders:form.custom.providerUrl.hint") }
                                </Hint>
                            ) }

                            component={ TextFieldAdapter }
                            maxLength={
                                SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MAX_LENGTH
                            }
                            minLength={
                                SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MIN_LENGTH
                            }
                            autoComplete="new-password"
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <FinalFormField
                            key="contentType"
                            fullWidth
                            FormControlProps={ {
                                margin: "dense"
                            } }
                            ariaLabel="contentType"
                            readOnly={ isReadOnly }
                            data-componentid={ `${componentId}-contentType` }
                            name="contentType"
                            type="text"
                            label={ t("smsProviders:form.custom.contentType.label") }
                            placeholder={ t("smsProviders:form.custom." +
                                "contentType.placeholder") }
                            helperText={ (
                                <Hint compact>
                                    { t("smsProviders:form.custom.contentType.hint") }
                                </Hint>
                            ) }
                            component={ TextFieldAdapter }
                            maxLength={
                                SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MAX_LENGTH
                            }
                            minLength={
                                SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MIN_LENGTH
                            }
                            autoComplete="new-password"
                            required
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={ 2 }>
                    <Grid.Column>
                        <FinalFormField
                            key="httpMethod"
                            fullWidth
                            FormControlProps={ {
                                margin: "dense"
                            } }
                            ariaLabel="httpMethod"
                            readOnly={ isReadOnly }
                            required={ false }
                            data-componentid={ `${componentId}-httpMethod` }
                            name="httpMethod"
                            type="text"
                            label={ t("smsProviders:form.custom.httpMethod.label") }
                            placeholder={ t("smsProviders:form.custom.httpMethod.placeholder") }
                            helperText={ (
                                <Hint compact>
                                    { t("smsProviders:form.custom.httpMethod.hint") }
                                </Hint>
                            ) }
                            component={ TextFieldAdapter }
                            maxLength={
                                SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MAX_LENGTH
                            }
                            minLength={
                                SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MIN_LENGTH
                            }
                            autoComplete="new-password"
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <FinalFormField
                            key="headers"
                            fullWidth
                            FormControlProps={ {
                                margin: "dense"
                            } }
                            ariaLabel="headers"
                            readOnly={ isReadOnly }
                            required={ false }
                            data-componentid={ `${componentId}-headers` }
                            name="headers"
                            type="text"
                            label={ t("smsProviders:form.custom.headers.label") }
                            placeholder={ t("smsProviders:form.custom.headers.placeholder") }
                            helperText={ (
                                <Hint compact>
                                    { t("smsProviders:form.custom.headers.hint") }
                                </Hint>
                            ) }
                            component={ TextFieldAdapter }
                            maxLength={
                                SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MAX_LENGTH
                            }
                            minLength={
                                SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MIN_LENGTH
                            }
                            autoComplete="new-password"
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={ 1 }>
                    <Grid.Column>
                        <FinalFormField
                            key="payload"
                            fullWidth
                            FormControlProps={ {
                                margin: "dense"
                            } }
                            ariaLabel="payload"
                            readOnly={ isReadOnly }
                            required={ true }
                            data-componentid={ `${componentId}-payload` }
                            name="payload"
                            type="text"
                            label={ t("smsProviders:form.custom.payload.label") }
                            placeholder={ t("smsProviders:form.custom.payload.placeholder") }
                            helperText={ (
                                <Hint compact>
                                    { t("smsProviders:form.custom.payload.hint") }
                                </Hint>
                            ) }
                            component={ TextFieldAdapter }
                            maxLength={
                                SMSProviderConstants.SMS_PROVIDER_CONFIG_TEMPLATE_FIELD_MAX_LENGTH
                            }
                            minLength={
                                SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MIN_LENGTH
                            }
                            autoComplete="new-password"
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={ 1 }>
                    <Grid.Column>
                        <div>
                            <Divider className="divider-container" />
                            <Heading className="heading-container" as="h5">
                                {
                                    t("smsProviders:fields.authenticationTypeDropdown.title")
                                }
                            </Heading>

                            { (
                                (!originalSMSProviderConfig || !originalSMSProviderConfig[0] ||
                                currentIsAuthenticationUpdateFormState)
                            ) && (
                                <Box className="box-container">
                                    <div className="box-field">
                                        <TextField
                                            select
                                            fullWidth
                                            label={ t(
                                                "smsProviders:fields.authenticationTypeDropdown.label"
                                            ) }
                                            placeholder={ t(
                                                "smsProviders:fields.authenticationTypeDropdown.placeholder"
                                            ) }
                                            value={ endpointAuthType || "" }
                                            onChange={ handleDropdownChange }
                                            required={ true }
                                            disabled={ isReadOnly }
                                            data-componentid={
                                                `${ componentId }-authentication-dropdown`
                                            }
                                            margin="dense"
                                        >
                                            {
                                                SMSProviderConstants.AUTH_TYPES.map((
                                                    option: DropdownChild) => (
                                                    <MenuItem
                                                        key={ option.value }
                                                        value={ option.value }
                                                    >
                                                        { t(option.text) }
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                        { showAuthSecretsHintWrapper() }

                                        { renderEndpointAuthPropertyFieldsWrapper() }

                                        { currentIsAuthenticationUpdateFormState && (
                                            <Button
                                                onClick={ handleAuthenticationChangeCancel }
                                                variant="outlined"
                                                size="small"
                                                className="secondary-button"
                                                data-componentid={ `${componentId}-cancel-edit-authentication-button` }
                                            >
                                                { t("actions:buttons.cancel") }
                                            </Button>
                                        ) }
                                    </div>
                                </Box>
                            ) }

                            {
                                (originalSMSProviderConfig && originalSMSProviderConfig[0] &&
                                !currentIsAuthenticationUpdateFormState) &&
                                renderAuthenticationSectionInfoBoxWrapper()
                            }
                        </div>
                    </Grid.Column>
                </Grid.Row>
                {
                    !isReadOnly && (
                        <>
                            <Divider hidden />
                            <Grid.Row columns={ 1 }>
                                <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 16 }>
                                    <PrimaryButton
                                        size="small"
                                        onClick={ onSubmit }
                                        ariaLabel="SMS provider form update button"
                                        data-componentid={ `${componentId}-update-button` }
                                        loading={ isLoading }
                                    >
                                        { "Submit" }
                                    </PrimaryButton>
                                </Grid.Column>
                            </Grid.Row>
                        </>
                    )
                }
            </Grid>
        </EmphasizedSegment>
        </div>
    );
};

CustomSMSProvider.defaultProps = {
    "data-componentid": "custom-sms-provider"
};

export default CustomSMSProvider;
