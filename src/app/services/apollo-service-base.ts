export abstract class ApolloServiceBase {
  private queryVariables = new Map<string, {}>();
  protected setQueryVariables(key: string, categoryId: number, variables: any) {
    const cacheKey = this.toCacheKey(key, categoryId);
    this.queryVariables.set(cacheKey, variables);
  }

  protected getQueryVariable(key: string, categoryId: number): any {
    const cacheKey = this.toCacheKey(key, categoryId);
    return this.queryVariables.get(cacheKey);
  }

  protected toCacheKey(key: string, categoryId: number) {
    return `${key}_${categoryId.toString()}`;
  }
}
