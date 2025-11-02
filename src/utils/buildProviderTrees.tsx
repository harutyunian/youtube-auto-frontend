import type {ComponentType, ReactNode} from 'react';


type ProviderArrayConfig<P = unknown> = [ComponentType<P>, P?];

function buildProvidersTree<P = unknown>(
    providerConfigs: ProviderArrayConfig<P>[]
): ComponentType<{ children: ReactNode }> {
    const Initial: ComponentType<{ children: ReactNode }> = ({children}) => <>{children}</>;

    return providerConfigs.reduceRight(
        (Accumulated, [Provider, props]) =>
            ({children}) => (
                <Accumulated>
                    <Provider {...(props as P)}>{children}</Provider>
                </Accumulated>
            ),
        Initial
    );
}

export default buildProvidersTree;